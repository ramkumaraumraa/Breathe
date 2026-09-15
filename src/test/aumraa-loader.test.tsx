import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { AumraaLoader, Loader } from "@aumraa/breathe-react/aumraa";

describe("Aumraa Brand Loader (Clockwise Spiral Growth)", () => {
  it("announces loading with a default accessible name", () => {
    render(<AumraaLoader />);
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  });

  it("shows the label and uses it as the accessible name", () => {
    render(<AumraaLoader label="Generating design tokens…" />);
    expect(screen.getByRole("status", { name: "Generating design tokens…" })).toHaveTextContent(
      "Generating design tokens…"
    );
  });

  it("applies the canonical pixel sizes", () => {
    const { rerender, container } = render(<AumraaLoader size="sm" />);
    expect(container.querySelector("svg")).toHaveAttribute("width", "40");

    rerender(<AumraaLoader size="md" />);
    expect(container.querySelector("svg")).toHaveAttribute("width", "72");

    rerender(<AumraaLoader size="lg" />);
    expect(container.querySelector("svg")).toHaveAttribute("width", "120");
  });

  it("renders the growing spiral stroke with brand gradient and clipping path", () => {
    const { container } = render(<AumraaLoader />);
    const stroke = container.querySelector('[data-part="spiral-stroke"]');
    expect(stroke).toBeInTheDocument();
    expect(stroke).toHaveClass("aumraa-spiral-stroke");
    expect(stroke).toHaveAttribute("stroke", expect.stringContaining("spiral-brand-grad"));

    const growGroup = container.querySelector('[data-part="spiral-grow-group"]');
    expect(growGroup).toHaveAttribute("clip-path", expect.stringContaining("spiral-clip"));
  });

  it("renders all 4 photosynthetic leaf tiers in order with correct brand fills", () => {
    const { container } = render(<AumraaLoader />);
    const leafGroup = container.querySelector('[data-part="leaf-group"]');
    expect(leafGroup).toBeInTheDocument();

    const base = container.querySelector('[data-part="leaf-base"]');
    const lowerMid = container.querySelector('[data-part="leaf-lowermid"]');
    const upperMid = container.querySelector('[data-part="leaf-uppermid"]');
    const apex = container.querySelector('[data-part="leaf-apex"]');

    expect(base).toHaveAttribute("fill", "#2F9E44");
    expect(lowerMid).toHaveAttribute("fill", "#81C341");
    expect(upperMid).toHaveAttribute("fill", "#ACD037");
    expect(apex).toHaveAttribute("fill", "#D9E026");
  });

  it("toggles the resting track visibility via showTrack", () => {
    const { rerender, container } = render(<AumraaLoader showTrack={true} />);
    expect(container.querySelector('[data-part="spiral-track"]')).toBeInTheDocument();

    rerender(<AumraaLoader showTrack={false} />);
    expect(container.querySelector('[data-part="spiral-track"]')).toBeNull();
  });

  it("generates unique gradient and clip IDs across instances", () => {
    const { container } = render(
      <>
        <AumraaLoader />
        <Loader />
      </>
    );
    const clipPaths = [...container.querySelectorAll("clipPath")].map((c) => c.id);
    expect(new Set(clipPaths).size).toBe(clipPaths.length);

    const gradIds = [...container.querySelectorAll("linearGradient")].map((g) => g.id);
    expect(new Set(gradIds).size).toBe(gradIds.length);
  });

  it("injects the CSS keyframes stylesheet into the document head with reduced-motion support", () => {
    render(<AumraaLoader />);
    const styleEl = document.getElementById("aumraa-loader-styles");
    expect(styleEl).toBeInTheDocument();
    expect(styleEl?.textContent).toContain("aumraa-spiral-grow");
    expect(styleEl?.textContent).toContain("aumraa-leaf-apex-sprout");
    expect(styleEl?.textContent).toContain("prefers-reduced-motion");
  });
});
