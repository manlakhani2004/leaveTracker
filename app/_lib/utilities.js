export const calculateDays = (fromDate, toDate) => {
    if (!fromDate || !toDate) return 0;
    const diffTime = toDate.getTime() - fromDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return diffDays;
};

export const getUpcommingLeaves = (allLeavesRequests,employee) => {
    // const allLeavesRequests = JSON.parse(localStorage.getItem("leaveRequests"));
    const filterByUser = allLeavesRequests.filter((leave) => leave.employeeName == employee.username)
    // console.log(filterByUser);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingLeaves = filterByUser.filter(leave => {
        const fromDate = new Date(leave.fromDate);
        fromDate.setHours(0, 0, 0, 0);
        return fromDate >= today;
    });

    return upcomingLeaves;
}