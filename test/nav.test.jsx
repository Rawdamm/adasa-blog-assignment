import { describe, it, expect, afterEach } from "vitest";
import { render, screen, within, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../src/App.jsx";
window.scrollTo = () => 1;
afterEach(cleanup);

const setup = (path = "/") =>
  render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);

describe("navigation", () => {
  it("header link opens blog page without reload", async () => {
    setup("/");
    await userEvent.click(screen.getAllByText("المدونة")[0]);
    expect(await screen.findByPlaceholderText("ابحث عن تدوينة...")).toBeTruthy();
  });
  it("clicking a card opens details", async () => {
    setup("/blog");
    const first = screen.getAllByRole("heading", { level: 3 })[0];
    await userEvent.click(within(first).getByRole("link"));
    expect(await screen.findByText(/العودة للمدونة/)).toBeTruthy();
  });
  it("back link returns to blog", async () => {
    setup("/blog/mastering-golden-hour-photography");
    await userEvent.click(screen.getByText(/العودة للمدونة/));
    expect(await screen.findByPlaceholderText("ابحث عن تدوينة...")).toBeTruthy();
  });
  it("search filters", async () => {
    setup("/blog");
    await userEvent.type(screen.getByPlaceholderText("ابحث عن تدوينة..."), "zzzz");
    expect(await screen.findByText(/لا توجد نتائج/)).toBeTruthy();
  });
  it("unknown route -> 404", () => { setup("/nope"); expect(screen.getByText("404")).toBeTruthy(); });
  it("shows 6 posts per page and paginates", async () => {
    setup("/blog");
    expect(screen.getAllByRole("heading", { level: 3 }).length).toBe(6);
    await userEvent.click(screen.getByRole("button", { name: "2" }));
    expect(screen.getAllByRole("heading", { level: 3 }).length).toBe(6);
    await userEvent.click(screen.getByRole("button", { name: "5" }));
    expect(screen.getAllByRole("heading", { level: 3 }).length).toBe(4);
  });
  it("bad ?page is clamped; filter resets to page 1", async () => {
    setup("/blog?page=999");
    expect(screen.getAllByRole("heading", { level: 3 }).length).toBe(4);
    await userEvent.selectOptions(screen.getByRole("combobox"), "بورتريه");
    expect(screen.getAllByRole("heading", { level: 3 }).length).toBe(6);
    expect(screen.queryByRole("button", { name: "2" })).toBeNull();
    await userEvent.selectOptions(screen.getByRole("combobox"), "تقنيات");
    await userEvent.click(screen.getByRole("button", { name: "2" }));
    expect(screen.getAllByRole("heading", { level: 3 }).length).toBe(3);
    await userEvent.type(screen.getByPlaceholderText("ابحث عن تدوينة..."), "ا");
    expect(screen.getByRole("button", { name: "1" }).className).toContain("on");
  });
});
