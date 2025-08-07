import { useState, useMemo, useEffect } from 'react';
import './Dashboard.css';
import logo from "../public/logo.png"
import SideBar from '../components/sideBar/SideBar';
import { get } from '../services/adminApi';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, PieChart, Pie, Cell, BarChart,Bar,ResponsiveContainer
} from "recharts";

const Dashboard = () => {
   // ---- Global period toggle ----
  const [period, setPeriod] = useState("day");
  // ---- Overview ----
  const [overview, setOverview] = useState(null);
  const [ovLoading, setOvLoading] = useState(true);

  // ---- Sales performance ----
  const [salesRows, setSalesRows] = useState([]);
  const [salesLoading, setSalesLoading] = useState(true);

  // ---- Enrollments vs completions ----
  const [evcRows, setEvcRows] = useState([]);
  const [evcLoading, setEvcLoading] = useState(true);

  // ---- Recent transactions ----
  const [recent, setRecent] = useState([]);
  const [recentLoading, setRecentLoading] = useState(true);

  // ---- Popular categories (pie) ----
  const [cats, setCats] = useState([]);
  const [catsLoading, setCatsLoading] = useState(true);

  // ---- Top lists ----
  const [topLearners, setTopLearners] = useState([]);
  const [topTeachers, setTopTeachers] = useState([]);
  const [topCourses, setTopCourses] = useState([]);
  const [topsLoading, setTopsLoading] = useState(true);

  useEffect(() => {
  let live = true;

  const fetchData = async () => {
    setOvLoading(true);
    setSalesLoading(true);
    setEvcLoading(true);
    setRecentLoading(true);
    setCatsLoading(true);
    setTopsLoading(true);

    try {
      const [
        overviewData,
        salesData,
        evcData,
        recentData,
        catsData,
        learnersData,
        teachersData,
        coursesData
      ] = await Promise.all([
        get("/dashboard/overview", { period }),
        get("/dashboard/sales-performance", { period }),
        get("/dashboard/enrollment-vs-completion", { period }),
        get("/dashboard/recent-transactions"),
        get("/dashboard/popular-categories", { period }),
        get("/dashboard/top-learners", { period }),
        get("/dashboard/top-teachers", { period }),
        get("/dashboard/top-courses", { period }),
      ]);

      if (!live) return;

      setOverview(overviewData);
      setSalesRows(salesData);
      setEvcRows(evcData);
      setRecent(recentData);
      setCats(catsData);
      setTopLearners(learnersData);
      setTopTeachers(teachersData);
      setTopCourses(coursesData);
    } catch (error) {
      console.error("Dashboard data error:", error);
    }

    setOvLoading(false);
    setSalesLoading(false);
    setEvcLoading(false);
    setRecentLoading(false);
    setCatsLoading(false);
    setTopsLoading(false);
  };

  fetchData();

  return () => (live = false);
}, [period]);
  return (
  <div className="dashboard-container">
    {/* Sidebar */}
    <SideBar logo={logo}/>
    
    {/* Main Content */}
    <main className="main-content">
      {/* Main Header */}
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
            <img src={logo} alt="" />
          </div>
        </div>
      </header>

      {/* Overview Cards */}
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
          <p>Active Users</p>
          <h3>In {period}:</h3>
          <h4>{ovLoading ? "Loading..." : overview?.activeUsers}</h4>
        </div>
      </section>

      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="grid-col-left">
          <section className="card performance-stats">
            <h3>Performance Statistics:</h3>
            <div className="chart-placeholder">
              <p>Sales Performance</p>
              <LineChart width={300} height={200} data={salesRows}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id.day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </div>
            <div className="chart-placeholder" style={{ marginTop: "15px" }}>
              <p>Enrollment vs Completion</p>
              <AreaChart width={300} height={200} data={evcRows}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="enrollments" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="completions" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </div>
          </section>
        </div>

        {/* Middle Column */}
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

          <section className="card demanded-categories">
            <h3>Popular Categories</h3>
            {catsLoading ? <p>Loading...</p> :
              <PieChart width={300} height={200}>
                <Pie
                  data={cats}
                  dataKey="total"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  fill="#8884d8"
                  label
                >
                  {cats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"][index % 4]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            }
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
        <Bar dataKey="enrollments" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )}
</section>
        </div>

        {/* Right Column */}
        <div className="grid-col-right">
          <section className="list-card top-learners">
            <h3>Top Learners</h3>
            <ul>
              {topLearners.map((item, i) => (
                <li key={i}>
                  <div className="list-img"><img src={item.profilePic} alt="" /></div>
                  <div><p>{item.name}</p><small>{item.totalLessons} lessons</small></div>
                </li>
              ))}
            </ul>
          </section>

          <section className="list-card top-teachers">
            <h3>Top Teachers</h3>
            <ul>
              {topTeachers.map((item, i) => (
                <li key={i}>
                  <div className="list-img"><img style={{width:'50px', height:'50px', borderRadius:'50%'}} src={item.profilePic} alt="" /></div>
                  <div><p>{item.name}</p><small>{item.enrollments} enrollments</small></div>
                </li>
              ))}
            </ul>
          </section>

          <section className="list-card top-courses-list">
            <h3>Top Courses</h3>
            <ul>
              {topCourses.map((item, i) => (
                <li key={i}>
                  <div className="list-img">
                    <img style={{width:'50px', height:'50px', borderRadius:'50%'}}  src={`https://devkingsbackend-production-3753.up.railway.app/${item.thubnail}`} alt="" />
                  </div>
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

export default Dashboard;
