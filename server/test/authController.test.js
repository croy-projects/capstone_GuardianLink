const httpMocks = require('node-mocks-http');
const authController = require('../src/controllers/authController');
const authService = require('../src/services/authService');

jest.mock('../src/services/authService', () => ({
    login: jest.fn(),
    registerVolunteer: jest.fn(),
    registerNGO: jest.fn(),
    forgotPassword: jest.fn(),
    updatePassword: jest.fn(),
}));

// Mock the database layer
//jest.mock('../src/services/authService');

describe("Auth Controller Tests", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    // =========================
    // LOGIN
    // =========================
    describe("login", () => {

        test("should login successfully", async () => {
            const req = httpMocks.createRequest({
                method: "POST",
                body: {
                    email: "test@test.com",
                    password: "123456"
                }
            });

            const res = httpMocks.createResponse();
            const next = jest.fn();

            authService.login.mockResolvedValue({
                token: "fake-token",
                user: { id: 1, email: "test@test.com" }
            });

            await authController.login(req, res, next);

            expect(res._getStatusCode()).toBe(200);
            expect(res._getJSONData().token).toBe("fake-token");
        });

        test("should fail if missing email/password", async () => {
            const req = httpMocks.createRequest({
                body: {}
            });

            const res = httpMocks.createResponse();
            const next = jest.fn();

            await authController.login(req, res, next);

            expect(next).toHaveBeenCalled();
        });

        test("should fail with invalid credentials", async () => {
            const req = httpMocks.createRequest({
                body: {
                    email: "wrong@test.com",
                    password: "badpass"
                }
            });

            const res = httpMocks.createResponse();
            const next = jest.fn();

            authService.login.mockResolvedValue(null);

            await authController.login(req, res, next);

            expect(next).toHaveBeenCalled();
        });

    });

    // =========================
    // REGISTER VOLUNTEER
    // =========================
    describe("registerVolunteer", () => {

        test("should register volunteer successfully", async () => {
            const req = httpMocks.createRequest({
                body: {
                    name: "John",
                    email: "john@test.com",
                    password: "123456",
                    confirmPassword: "123456",
                    hours: 10
                },
                files: {}
            });

            const res = httpMocks.createResponse();
            const next = jest.fn();

            authService.registerVolunteer.mockResolvedValue({
                userId: 1
            });

            await authController.registerVolunteer(req, res, next);

            expect(res._getStatusCode()).toBe(201);
            expect(res._getJSONData().message)
                .toBe("Volunteer registered successfully");
        });

        test("should fail validation", async () => {
            const req = httpMocks.createRequest({
                body: {
                    name: "",
                    email: "",
                },
                files: {}
            });

            const res = httpMocks.createResponse();
            const next = jest.fn();

            await authController.registerVolunteer(req, res, next);

            expect(next).toHaveBeenCalled();
        });

    });

    // =========================
    // REGISTER NGO
    // =========================
    describe("registerNGO", () => {

        test("should register NGO successfully", async () => {
            const req = httpMocks.createRequest({
                body: {
                    name: "NGO Org",
                    email: "ngo@test.com",
                    password: "123456",
                    confirmPassword: "123456",
                    areaOfConcern: "Security"
                }
            });

            const res = httpMocks.createResponse();
            const next = jest.fn();

            authService.registerNGO.mockResolvedValue({
                userId: 2
            });

            await authController.registerNGO(req, res, next);

            expect(res._getStatusCode()).toBe(201);
        });

    });

    // =========================
    // FORGOT PASSWORD
    // =========================
    describe("forgotPassword", () => {

        test("should send request successfully", async () => {
            const req = httpMocks.createRequest({
                body: {
                    email: "test@test.com"
                }
            });

            const res = httpMocks.createResponse();
            const next = jest.fn();

            authService.forgotPassword.mockResolvedValue(true);

            await authController.forgotPassword(req, res, next);

            expect(res._getStatusCode()).toBe(200);
        });

    });

    // =========================
    // RESET PASSWORD
    // =========================
    describe("resetPassword", () => {

        test("should allow admin to reset password", async () => {
            const req = httpMocks.createRequest({
                params: { id: "1" },
                body: { password: "newpass" },
                user: { id: 99, role_id: 1 } // assume ADMIN
            });

            const res = httpMocks.createResponse();

            authService.updatePassword.mockResolvedValue(true);

            await authController.resetPassword(req, res);

            expect(res._getStatusCode()).toBe(200);
        });

        test("should block unauthorized user", async () => {
            const req = httpMocks.createRequest({
                params: { id: "1" },
                body: { password: "newpass" },
                user: { id: 2, role_id: 2 } // not admin & not owner
            });

            const res = httpMocks.createResponse();

            await authController.resetPassword(req, res);

            expect(res._getStatusCode()).toBe(403);
        });

    });

});