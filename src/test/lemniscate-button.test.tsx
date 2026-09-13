import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Download, Plus } from "lucide-react";

import { Button, buttonVariants } from "@aumraa/breathe-react/lemniscate";

describe("Leminiscate Button", () => {
  it("keeps the existing default variant API intact", () => {
    render(<Button>Save changes</Button>);
    expect(screen.getByRole("button", { name: "Save changes" })).toBeInTheDocument();
  });

  it("renders loading state and forces disabled", () => {
    render(<Button loading loadingText="Downloading">Export report</Button>);

    const button = screen.getByRole("button", { name: "Downloading" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("data-loading", "true");
  });

  it("renders icon-only buttons with the compact icon size", () => {
    render(<Button leftIcon={<Plus />} aria-label="Add resident" />);
    const button = screen.getByRole("button", { name: "Add resident" });
    expect(button.className).toContain("w-11");
  });

  it("supports the new semantic variants", () => {
    const className = buttonVariants({ variant: "neutral", size: "xxl" });
    expect(className).toContain("bg-[var(--color-neutral-white-25)]");
    expect(className).toContain("h-16");
  });

  it("renders left and right icons around text content", () => {
    render(
      <Button leftIcon={<Plus data-testid="left-icon" />} rightIcon={<Download data-testid="right-icon" />}>
        Generate
      </Button>,
    );

    expect(screen.getByRole("button", { name: "Generate" })).toBeInTheDocument();
    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });

  it("keeps direct icon and label children as separate flex items", () => {
    render(
      <Button>
        <Plus data-testid="direct-icon" />
        <span>Payment Records</span>
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Payment Records" });
    expect(button.firstElementChild).toBe(screen.getByTestId("direct-icon"));
  });
});
