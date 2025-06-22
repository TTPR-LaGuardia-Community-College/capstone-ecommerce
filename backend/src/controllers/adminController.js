import asyncHandler from 'express-async-handler';

export const getAdminDashboard = asyncHandler(async (req, res) => {
  // Example: pretend to query admin stats
  const data = {
    users: 128,
    activeListings: 56,
    pendingApprovals: 3,
    messagesToday: 22,
  };

  res.json({
    success: true,
    message: 'Admin dashboard data fetched successfully',
    data,
  });
});
