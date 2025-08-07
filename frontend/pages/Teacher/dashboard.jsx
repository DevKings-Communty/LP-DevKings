import { useState, useMemo, useEffect, useContext } from 'react';
import '../Dashboard.css';
import logo from "../../public/logo.png";
import TeacherSideBar from '../../components/TeacherSideBar/TeacherSideBar';
import { get } from '../../services/teacherApi';
import { AuthContext } from '../../context/AuthProvider';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, BarChart, Bar, ResponsiveContainer
} from "recharts";

const TeacherDashboard = () => {
  const [period, setPeriod] = useState("day");
  const [overview, setOverview] = useState(null);
  const [ovLoading, setOvLoading] = useState(true);
  const [salesRows, setSalesRows] = useState([]);
  const [salesLoading, setSalesLoading] = useState(true);
  const [evcRows, setEvcRows] = useState([]);
  const [evcLoading, setEvcLoading] = useState(true);
  const [recent, setRecent] = useState([]);
  const [recentLoading, setRecentLoading] = useState(true);
  const [topLearners, setTopLearners] = useState([]);
  const [topCourses, setTopCourses] = useState([]);
  const [topsLoading, setTopsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    let live = true;


    const fetchData = async () => {
      setOvLoading(true);
      setSalesLoading(true);
      setEvcLoading(true);
      setRecentLoading(true);
      setTopsLoading(true);

      try {
        const [
          overviewData,
          salesData,
          evcData,
          recentData,
          learnersData,
          coursesData
        ] = await Promise.all([
          get("/dashboard/overview", { period }),
          get("/dashboard/sales-performance", { period }),
          get("/dashboard/enrollment-vs-completion", { period }),
          get("/dashboard/recent-transactions"),
          get("/dashboard/top-learners", { period }),
          get("/dashboard/top-courses", { period })
        ]);

        if (!live) return;

        setOverview(overviewData);
        setSalesRows(salesData);
        setEvcRows(evcData);
        setRecent(recentData);
        setTopLearners(learnersData);
        setTopCourses(coursesData);
      } catch (error) {
        console.error("Dashboard data error:", error);
      }

      setOvLoading(false);
      setSalesLoading(false);
      setEvcLoading(false);
      setRecentLoading(false);
      setTopsLoading(false);
    };

    fetchData();

    return () => (live = false);
  }, [period]);

  return (
    <div className="dashboard-container">
      <TeacherSideBar logo={logo} />

      <main className="main-content">
        <header className="main-header">
          <h2>Overview:</h2>
          <div className="header-actions">
            <div className="date-filter">
              {["day", "week", "month", "year"].map(p => (
                <button
                  key={p}
                  className={period === p ? "active" : ""}
                  onClick={() => setPeriod(p)}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
            <span className="header-icon">⚙️</span>
            <div className="user-profile">
              <p >{user.firstName} {user.lastName}</p>
              <img src={user ? `${user.profilePic}`:logo} style={{width:'70px', height:'70px', borderRadius:'50%'}} />
            </div>
          </div>
        </header>

        <section className="overview-section">
          <div className="overview-card">
            <p>Total Revenue</p>
            <h3>In {period}:</h3>
            <h4>{ovLoading ? "Loading..." : `$${overview?.revenue.toLocaleString()}`}</h4>
          </div>
          <div className="overview-card">
            <p>Courses Created</p>
            <h3>In {period}:</h3>
            <h4>{ovLoading ? "Loading..." : overview?.coursesCreated}</h4>
          </div>
          <div className="overview-card">
            <p>Lessons Created</p>
            <h3>In {period}:</h3>
            <h4>{ovLoading ? "Loading..." : overview?.lessonsCreated}</h4>
          </div>
          <div className="overview-card">
            <p>Active Learners</p>
            <h3>In {period}:</h3>
            <h4>{ovLoading ? "Loading..." : overview?.activeUsers}</h4>
          </div>
        </section>

        <div className="dashboard-grid">
          <div className="grid-col-left">
            <section className="card performance-stats">
              <h3>Performance Statistics:</h3>
              <div className="chart-placeholder">
                <p>Sales Performance</p>
                <ResponsiveContainer width="100%" height={220}>
                <LineChart data={salesRows}>
                    <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id.day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                    type="basis"
                    dataKey="count"
                    stroke="#8884d8"
                    strokeWidth={3}
                    dot={false}
                    />
                </LineChart>
                </ResponsiveContainer>

              </div>
              <div className="chart-placeholder" style={{ marginTop: "15px" }}>
                <p>Enrollment vs Completion</p>
               <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={evcRows}>
                    <defs>
                    <linearGradient id="colorEnroll" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorComplete" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="title" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="enrollments" stroke="#8884d8" fill="url(#colorEnroll)" />
                    <Area type="monotone" dataKey="completions" stroke="#82ca9d" fill="url(#colorComplete)" />
                </AreaChart>
            </ResponsiveContainer>

              </div>
            </section>
          </div>

          <div className="grid-col-middle">
            <section className="card recent-transactions">
              <h3>Recent Transactions</h3>
              <ul>
                {recentLoading ? <p>Loading...</p> :
                  recent.map((item, index) => (
                    <li key={index}>
                      <span>{item.studentId?.firstName} {item.studentId?.lastName}</span>
                      <button>View Sale</button>
                    </li>
                  ))}
              </ul>
            </section>
            <section className="card top-selling-courses">
              <h3>Top-Selling Courses</h3>
              {topsLoading ? <p>Loading...</p> : (
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={topCourses} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="title" type="category" width={150} />
                        <Tooltip />
                        <Bar dataKey="enrollments" fill="#8884d8" radius={[10, 10, 10, 10]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>

              )}
            </section>
          </div>

          <div className="grid-col-right">
            <section className="list-card top-learners">
              <h3>Top Learners</h3>
              {topsLoading ? <p>Loading...</p> : (
                <ul>
                  {topLearners.map((item, i) => (
                    <li key={i}>
                      <div className="list-img"><img src={item.profilePic} alt="" /></div>
                      <div><p>{item.name}</p><small>{item.totalLessons} lessons</small></div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
            <section className="list-card top-courses-list">
              <h3>Top Courses</h3>
              <ul>
                {topCourses.map((item, i) => (
                  <li key={i}>
                    <div className="list-img"></div>
                    <div><p>{item.title}</p><small>{item.enrollments} enrollments</small></div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
