import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import LoginPage from "./LoginPage";


describe("LoginPage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("logs in with valid credentials, stores the JWT, and calls onLoginSuccess", async () => {
    const user = userEvent.setup();
    const onLoginSuccess = vi.fn();

    const mockUser = {
      username: "johnsmith",
      email: "john@example.com",
      first_name: "John",
      last_name: "Smith",
    };

    // Mock a successful response when we fetch the backend
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          success: true,
          message: "Login successful",
          data: {
            token: "test-jwt-token",
            user: mockUser,
          },
        }),
      })
    );

    render(<LoginPage onLoginSuccess={onLoginSuccess} />);

    // Get the user to type in the username into the username field on the screen
    await user.type(screen.getByLabelText(/username/i), "johnsmith");
    // Put in a password that could be the password
    await user.type(screen.getByLabelText(/password/i), "StrongPass123!");
    // Click log in 
    await user.click(screen.getByRole("button", { name: /log in/i }));

    // Check we have received and stored the token
    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("test-jwt-token");
    });

    // Expect that clicking the login button called fetch just once
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    // Expect it to have called the onLoginSuccess function which we will program later
    expect(onLoginSuccess).toHaveBeenCalledWith({
      token: "test-jwt-token",
      user: mockUser,
    });
  });
});