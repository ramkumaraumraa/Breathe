import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { KayoBrutalistLoader, Loader as KaayoLoader } from "@aumraa/breathe-react/kaayo";

describe("Kaayo Brand Loader (Stallion)", () => {
  it("announces loading with a default accessible name", () => {
    render(<KaayoLoader />);
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  });

  it("shows the label and uses it as the accessible name", () => {
    render(<KaayoLoader label="Connecting to tutor…" />);
    expect(screen.getByRole("status", { name: "Connecting to tutor…" })).toHaveTextContent(
      "Connecting to tutor…"
    );
  });

  it("applies the requested pixel sizes", () => {
    const { rerender, container } = render(<KaayoLoader size="sm" />);
    expect(container.querySelector("svg")).toHaveAttribute("width", "40");
    expect(container.querySelector("svg")).toHaveAttribute("height", "40");

    rerender(<KaayoLoader size="md" />);
    expect(container.querySelector("svg")).toHaveAttribute("width", "72");
    expect(container.querySelector("svg")).toHaveAttribute("height", "72");

    rerender(<KaayoLoader size="lg" />);
    expect(container.querySelector("svg")).toHaveAttribute("width", "120");
    expect(container.querySelector("svg")).toHaveAttribute("height", "120");
  });

  it("renders horse with galloping animation class and 6 anatomical paths", () => {
    const { container } = render(<KaayoLoader />);
    const horseGroup = container.querySelector('[data-part="horse"]');
    expect(horseGroup).toBeInTheDocument();
    expect(horseGroup).toHaveClass("kayo-loader-gallop");
    expect(horseGroup?.querySelectorAll("path")).toHaveLength(6);
  });

  it("renders ground stride shadow using primary light crimson color and hides when showShadow={false}", () => {
    const { rerender, container } = render(<KaayoLoader />);
    const shadow = container.querySelector('[data-part="shadow"]');
    expect(shadow).toBeInTheDocument();
    expect(shadow).toHaveAttribute("fill", expect.stringContaining("crimson-300"));

    rerender(<KaayoLoader showShadow={false} />);
    expect(container.querySelector('[data-part="shadow"]')).toBeNull();
  });

  it("supports tone variants (brand, light, white)", () => {
    const { rerender, container } = render(<KaayoLoader tone="brand" />);
    expect(container.querySelector('[data-part="horse"] path')).toHaveAttribute(
      "fill",
      expect.stringContaining("-horse-grad")
    );

    rerender(<KaayoLoader tone="white" />);
    expect(container.querySelector('[data-part="shadow"]')).toHaveAttribute("fill", "#F1F5F9");
  });

  it("generates unique gradient IDs across instances", () => {
    const { container } = render(
      <>
        <KaayoLoader />
        <KayoBrutalistLoader />
      </>
    );
    const ids = [...container.querySelectorAll("linearGradient")].map((g) => g.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("injects the CSS keyframes stylesheet into the document head", () => {
    render(<KaayoLoader />);
    const styleEl = document.getElementById("kayo-loader-styles");
    expect(styleEl).toBeInTheDocument();
    expect(styleEl?.textContent).toContain("kayo-loader-gallop");
    expect(styleEl?.textContent).toContain("kayo-loader-shadow");
    expect(styleEl?.textContent).toContain("prefers-reduced-motion");
  });
});
