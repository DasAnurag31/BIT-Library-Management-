import express from "express";
import { isAutheticated, authorizeRoles } from "../middleware/auth";
import {
  becomeMember,
  deleteMember,
  getAllMembers,
  getMemberById,
  getAllRegisteredStudents,
  getAllAdminUsers,
  makeUserMember,
  getStudentById,
} from "../controllers/member.controller";

const router = express.Router();

// Make User a Member --Admin
router.post("/member/", isAutheticated, authorizeRoles("admin"), becomeMember); // OK

// Get all Members --Admin
router.get("/member/", isAutheticated, authorizeRoles("admin"), getAllMembers); // OK

// Get all Members --Admin
router.get(
  "/member/:userId",
  isAutheticated,
  authorizeRoles("admin"),
  getMemberById
); // OK

// Delete a Memebr --Admin
router.delete(
  "/member/:userId",
  isAutheticated,
  authorizeRoles("admin"),
  deleteMember
); // OK

// Get all Students
router.get(
  "/users/students",
  isAutheticated,
  authorizeRoles("admin"),
  getAllRegisteredStudents
);

// Get a Student by ID
router.get(
  "/users/students/:id",
  isAutheticated,
  authorizeRoles("admin"),
  getStudentById
);

// Get all Administrators
router.get(
  "/users/administrators",
  isAutheticated,
  authorizeRoles("admin"),
  getAllAdminUsers
);

// Verify a Student and make them a Member
router.post(
  "/member/new/:userId",
  isAutheticated,
  authorizeRoles("admin"),
  makeUserMember
);

export default router;
