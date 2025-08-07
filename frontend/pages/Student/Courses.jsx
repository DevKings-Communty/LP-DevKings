import searchCourse from '/search-courses.svg'
import filterCpurse from '/filter-course.svg'
import Header from '../../components/Student/Header/Header'
import Footer from '../../components/Student/Footer/Footer'
import Course from '../../components/Student/Course/Course'
import { useState, useEffect, useMemo } from 'react'
import styles from './Courses.module.css'
import Layout from '../../layouts/Student/Layout'

function Courses() {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState({});
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsDropdownOpen(false);
    };
    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('all');
    };
    const filteredCourses = useMemo(() => {
        let filtered = courses;
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(course =>
                course.title.toLowerCase().includes(query) ||
                course.category.toLowerCase().includes(query) ||
                (course.description && course.description.toLowerCase().includes(query))
            );
        }
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(course => course.category === selectedCategory);
        }
        return filtered;
    }, [searchQuery, selectedCategory, courses]);
    const coursesByCategory = useMemo(() => {
        const map = {};

        const filteredCategories = [...new Set(filteredCourses.map(course => course.category))];

        filteredCategories.forEach(cat => {
            map[cat] = filteredCourses.filter(course => course.category === cat);
        });

        return map;
    }, [filteredCourses]);
    const toggleCategoryExpansion = (category) => {
        setExpandedCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://devkingsbackend-production-3753.up.railway.app/api/public/AllCourses');

                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }
                const data = await response.json();
                const coursesArray = Array.isArray(data) ? data : [];

                setCourses(coursesArray);

                const uniqueCategories = [...new Set(
                    coursesArray
                        .map(course => course.category)
                        .filter(Boolean)
                )].sort();
                setCategories(uniqueCategories);

            } catch (err) {
                setError(err.message);
                console.error('Error fetching courses:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);
    if (loading) {
        return (
            <Layout>
                <div className={styles.coursesHead}>
                    <h1>Courses</h1>
                </div>
                <div className="loading-state">
                    <p>Loading courses...</p>
                </div>
            </Layout>
        );
    }
    if (error) {
        return (
            <Layout>
                <div className={styles.coursesHead}>
                    <h1>Courses</h1>
                </div>
                <div className={styles.errorState}>
                    <p>Error loading courses: {error}</p>
                    <button onClick={() => window.location.reload()}>Try Again</button>
                </div>
            </Layout>
        );
    }
    return (
        <Layout>
            <div className={styles.coursesHead}>
                <h1>Courses</h1>
                <div className={styles.formCourses}>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className={styles.searchContainer}>
                            <input
                                type="text"
                                placeholder="Search courses, categories..."
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                            <img src={searchCourse} alt="Search" />
                        </div>
                    </form>
                    <div className={styles.filterContainer}>
                        <div className={styles.dropdown}>
                            <button
                                className={styles.dropdownToggle}
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                aria-expanded={isDropdownOpen}
                            >
                                <img src={filterCpurse} alt="Filter" />
                                {/* <span>
                                    {selectedCategory === 'all' ? 'All Categories' : selectedCategory}
                                </span>
                                <span className={`${styles.dropdownArrow} ${isDropdownOpen ? 'open' : ''}`}>▼</span> */}
                            </button>
                            {isDropdownOpen && (
                                <div className={styles.dropdownMenu}>
                                    <button
                                        className={`${styles.dropdownItem} ${selectedCategory === 'all' ? 'active' : ''}`}
                                        onClick={() => handleCategorySelect('all')}
                                    >
                                        All Categories
                                    </button>
                                    {categories.map(category => (
                                        <button
                                            key={category}
                                            className={`${styles.dropdownItem} ${selectedCategory === category ? 'active' : ''}`}
                                            onClick={() => handleCategorySelect(category)}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    {(searchQuery || selectedCategory !== 'all') && (
                        <button className={styles.clearFilters} onClick={clearFilters}>
                            Clear Filters
                        </button>
                    )}
                </div>
            </div>
            <div className={styles.coursesResults}>
                {searchQuery || selectedCategory !== 'all' ? (
                    <div className={styles.filterInfo}>
                        <p>
                            Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
                            {searchQuery && ` matching "${searchQuery}"`}
                            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                        </p>
                    </div>
                ) : null}
            </div>
            <div className={styles.courses}>
                {Object.keys(coursesByCategory).length === 0 ? (
                    <div className={styles.noCourses}>
                        <h3>No courses found</h3>
                        <p>
                            {searchQuery || selectedCategory !== 'all'
                                ? 'Try adjusting your search or filter criteria.'
                                : 'No courses available at the moment.'
                            }
                        </p>
                    </div>
                ) : (
                    Object.entries(coursesByCategory).map(([category, catCourses]) => (
                        <div key={category} className={styles.categorySection}>
                            <div className={styles.categoryHeader}>
                                <h2 className={styles.categoryTitle}>{category}</h2>
                                <span className={styles.courseCount}>({catCourses.length} course{catCourses.length !== 1 ? 's' : ''})</span>
                            </div>
                            <div className={styles.categoryCourses}>
                                {(expandedCategories[category] ? catCourses : catCourses.slice(0, 3)).map(course => (
                                    <Course key={course._id} course={course} />
                                ))}
                            </div>
                            {catCourses.length > 3 && (
                                <div className={styles.showBtn} style={{ marginTop: '25px' }}>
                                    <button
                                        className={styles.viewAllBtn}
                                        onClick={() => toggleCategoryExpansion(category)}
                                    >
                                        {expandedCategories[category] ? 'Show Less' : `View All ${catCourses.length} Courses`}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </Layout>
    );
}

export default Courses;