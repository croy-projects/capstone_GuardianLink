const request = require("supertest");
const express = require("express");

const authRoutes = require("../src/routes/authRoutes");

// Mock middleware
jest.mock("../src/middleware/authMiddleware", () => ({
    authenticate: (req, res, next) => {
        req.user = { id: 1, role_id: 1 }; // fake admin
        next();
    }
}));

jest.mock("../src/middleware/uploadMiddleware", () => {
    return {
        fields: () => (req, res, next) => {
            req.files = {};
            next();
        }
    };
});

// Mock controller
jest.mock("../src/controllers/authController", () => ({
    login: (req, res) => res.status(200).json({ message: "login ok" }),
    registerNGO: (req, res) => res.status(201).json({ message: "ngo ok" }),
    registerVolunteer: (req, res) => res.status(201).json({ message: "volunteer ok" }),
    forgotPassword: (req, res) => res.status(200).json({ message: "forgot ok" }),
    resetPassword: (req, res) => res.status(200).json({ message: "reset ok" }),
}));

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

describe("Auth Routes", () => {

    test("POST /login", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({ email: "test@test.com", password: "123456" });

        expect(res.statusCode).toBe(200);
    });

    test("POST /register-ngo", async () => {
        const res = await request(app)
            .post("/api/auth/register-ngo")
            .send({});

        expect(res.statusCode).toBe(201);
    });

    test("POST /register-volunteer", async () => {
        const res = await request(app)
            .post("/api/auth/register-volunteer")
            .send({});

        expect(res.statusCode).toBe(201);
    });

    test("POST /forgot-password", async () => {
        const res = await request(app)
            .post("/api/auth/forgot-password")
            .send({ email: "test@test.com" });

        expect(res.statusCode).toBe(200);
    });

    test("PUT /reset-password/:id", async () => {
        const res = await request(app)
            .put("/api/auth/reset-password/1")
            .send({ password: "newpass" });

        expect(res.statusCode).toBe(200);
    });

});