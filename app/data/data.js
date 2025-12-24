export const leaveBalance = [
    {
        leaveType: "sickLeave",
        balance: 8
    },
    {
        leaveType: "casualLeave",
        balance: 10
    },
    {
        leaveType: "earnedLeave",
        balance: 13
    },
]


export const upcomingLeaves = [
    {
        id: 1,
        leaveType: "Casual Leave",
        period: "10 Mar 2025 - 11 Mar 2025",
        days: 2,
        reason: "Family function",
        status: "Approved",
    },
    {
        id: 2,
        leaveType: "Sick Leave",
        period: "18 Mar 2025 - 18 Mar 2025",
        days: 1,
        reason: "Doctor appointment",
        status: "Pending",
    }
];


export const leaveRequests = [
    {
      id: 1,
      employeeName: "Rahul Sharma",
      leaveType: "Sick Leave",
      fromDate: "2025-01-10",
      toDate: "2025-01-12",
      days: 3,
      reason: "Fever",
      status: "Pending",
    },
    {
      id: 2,
      employeeName: "Anita Verma",
      leaveType: "Casual Leave",
      fromDate: "2025-01-15",
      toDate: "2025-01-15",
      days: 1,
      reason: "Personal work",
      status: "Approved",
    },
    {
      id: 3,
      employeeName: "Suresh Kumar",
      leaveType: "Earned Leave",
      fromDate: "2025-01-20",
      toDate: "2025-01-25",
      days: 6,
      reason: "Family function",
      status: "Rejected",
    }  
  ];


export const  AdminSidebar = [
        {
            name: "Dashboard"
        },
        {
            name: "Logout"
        }
    ]
    