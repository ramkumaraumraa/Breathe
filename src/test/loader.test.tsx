import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Loader } from "@/app/components/atoms/loader";
import { Loader as LemniscateLoader } from "@aumraa/breathe-react/lemniscate";

describe("Loader (default ring)", () => {
  it("announces loading with a default accessible name", () => {
    render(<Loader />);
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  });

  it("shows the label and uses it as the accessible name", () => {
    render(<Loader label="Saving…" />);
    expect(screen.getByRole("status", { name: "Saving…" })).toHaveTextContent("Saving…");
  });

  it("applies the ring size", () => {
    const { container } = render(<Loader size="lg" />);
    expect(container.querySelector(".animate-spin")?.className).toContain("h-9");
  });
});

describe("Leminiscate Loader", () => {
  it("draws a faint track and a traced loop", () => {
    const { container } = render(<LemniscateLoader />);
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
    expect(container.querySelector('[data-part="track"]')).toHaveAttribute("stroke-opacity", "0.15");
    const trace = container.querySelector('[data-part="trace"]');
    expect(trace).toHaveAttribute("pathLength", "100");
    expect(trace).toHaveClass("lmns-loader-trace");
  });

  it("pulses only the roof, never the loop", () => {
    const { container } = render(<LemniscateLoader />);
    expect(container.querySelector('[data-part="roof"]')).toHaveClass("lmns-loader-roof");
    expect(container.querySelector("svg")).not.toHaveClass("lmns-loader-roof");
    expect(container.querySelector('[data-part="trace"]')).not.toHaveClass("lmns-loader-roof");
    expect(document.getElementById("lmns-loader-styles")?.textContent).toContain("lmns-loader-pulse");
  });

  it("shows the roof by default", () => {
    const { container } = render(<LemniscateLoader />);
    expect(container.querySelector('[data-part="roof"]')).toBeInTheDocument();
    expect(container.querySelector("svg")).toHaveAttribute("viewBox", "0 0 736 400");
  });

  it("drops the roof and crops to the loop with showRoof={false}", () => {
    const { container } = render(<LemniscateLoader showRoof={false} size="lg" />);
    expect(container.querySelector('[data-part="roof"]')).toBeNull();
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("viewBox", "48 111 640 296");
    expect(svg).toHaveAttribute("width", "120");
  });

  it("gives each instance its own gradient ids", () => {
    const { container } = render(
      <>
        <LemniscateLoader />
        <LemniscateLoader />
      </>,
    );
    const ids = [...container.querySelectorAll("linearGradient")].map((g) => g.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("injects the animation styles once", () => {
    render(
      <>
        <LemniscateLoader />
        <LemniscateLoader label="Loading…" />
      </>,
    );
    expect(document.querySelectorAll("#lmns-loader-styles")).toHaveLength(1);
  });
});
