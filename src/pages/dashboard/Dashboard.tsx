const Dashboard = () => {
  // Sample data for testing
  const metrics = [
    {
      label: "Total Users",
      value: "24,521",
      change: "+12.3%",
      color: "bg-blue-500",
    },
    {
      label: "Revenue",
      value: "$45,231",
      change: "+8.2%",
      color: "bg-green-500",
    },
    {
      label: "Active Sessions",
      value: "1,423",
      change: "-3.1%",
      color: "bg-purple-500",
    },
    {
      label: "Bounce Rate",
      value: "32.5%",
      change: "+2.4%",
      color: "bg-orange-500",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      user: "John Doe",
      action: "Created new project",
      time: "2 min ago",
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "Updated settings",
      time: "15 min ago",
    },
    { id: 3, user: "Bob Johnson", action: "Deleted file", time: "1 hour ago" },
    {
      id: 4,
      user: "Alice Brown",
      action: "Added team member",
      time: "3 hours ago",
    },
    {
      id: 5,
      user: "Charlie Wilson",
      action: "Exported report",
      time: "5 hours ago",
    },
    {
      id: 6,
      user: "Diana Prince",
      action: "Completed task",
      time: "1 day ago",
    },
  ];

  const tasks = [
    {
      id: 1,
      title: "Review pull requests",
      priority: "High",
      completed: false,
    },
    {
      id: 2,
      title: "Update documentation",
      priority: "Medium",
      completed: true,
    },
    { id: 3, title: "Fix navigation bug", priority: "High", completed: false },
    {
      id: 4,
      title: "Design system updates",
      priority: "Low",
      completed: false,
    },
    { id: 5, title: "Team meeting", priority: "Medium", completed: true },
  ];

  return (
    <div className=" mt-11 bg-gray-50 p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your projects today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 ${metric.color} rounded-lg opacity-20`}
              />
              <span className="text-sm font-medium text-gray-500">
                {metric.label}
              </span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-gray-800">
                {metric.value}
              </span>
              <span
                className={`text-sm font-medium ${metric.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
              >
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section - Using divs as placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Revenue Overview
          </h3>
          <div className="h-64 bg-gradient-to-b from-blue-50 to-white rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <span className="text-gray-500">
              📊 Chart Placeholder - Revenue Data
            </span>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            <div className="text-center">
              <div className="text-sm text-gray-500">Mon</div>
              <div className="font-semibold">$2.4k</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Tue</div>
              <div className="font-semibold">$3.1k</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Wed</div>
              <div className="font-semibold">$2.8k</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Thu</div>
              <div className="font-semibold">$3.5k</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            User Acquisition
          </h3>
          <div className="h-64 bg-gradient-to-b from-green-50 to-white rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <span className="text-gray-500">
              📈 Chart Placeholder - User Growth
            </span>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Direct</span>
              <div className="w-48 h-2 bg-gray-200 rounded-full">
                <div className="w-3/4 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <span className="text-sm font-medium">75%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Organic</span>
              <div className="w-48 h-2 bg-gray-200 rounded-full">
                <div className="w-1/2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-sm font-medium">50%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Referral</span>
              <div className="w-48 h-2 bg-gray-200 rounded-full">
                <div className="w-2/3 h-2 bg-purple-500 rounded-full"></div>
              </div>
              <span className="text-sm font-medium">66%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tables and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-800">{activity.user}</p>
                  <p className="text-sm text-gray-500">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Tasks</h3>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    readOnly
                    className="w-4 h-4 text-blue-600 rounded border-gray-300"
                  />
                  <span
                    className={`text-sm ${task.completed ? "line-through text-gray-400" : "text-gray-700"}`}
                  >
                    {task.title}
                  </span>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    task.priority === "High"
                      ? "bg-red-100 text-red-700"
                      : task.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
            + Add New Task
          </button>
        </div>
      </div>

      {/* Additional Content Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            System Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">API Response Time</span>
              <span className="font-medium text-green-600">245ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Server Load</span>
              <span className="font-medium text-yellow-600">42%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Database Connections</span>
              <span className="font-medium text-green-600">156/200</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Memory Usage</span>
              <span className="font-medium text-blue-600">4.2 GB</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
              <span className="block font-medium">📄 New Report</span>
              <span className="text-xs text-gray-500">Generate PDF</span>
            </button>
            <button className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
              <span className="block font-medium">👥 Add User</span>
              <span className="text-xs text-gray-500">Team member</span>
            </button>
            <button className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
              <span className="block font-medium">⚙️ Settings</span>
              <span className="text-xs text-gray-500">Configure</span>
            </button>
            <button className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
              <span className="block font-medium">📊 Export Data</span>
              <span className="text-xs text-gray-500">CSV format</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-gray-200">
        <p className="text-center text-sm text-gray-500">
          Dashboard v2.0 | Last updated: {new Date().toLocaleDateString()} |
          Showing test data for development
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
