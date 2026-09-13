import { fireEvent, render, screen } from '@testing-library/react-native';
import { ToggleGroup, ToggleGroupItem } from '../../../src/atoms/form-elements/toggle-group';

function Period({
  value,
  onValueChange,
  disabled,
}: {
  value: string;
  onValueChange: (v: string | undefined) => void;
  disabled?: boolean;
}) {
  return (
    <ToggleGroup testID="group" type="single" variant="outline" value={value} onValueChange={onValueChange} disabled={disabled}>
      <ToggleGroupItem testID="month" value="month" aria-label="Month">Month</ToggleGroupItem>
      <ToggleGroupItem testID="year" value="year" aria-label="Year">Year</ToggleGroupItem>
    </ToggleGroup>
  );
}

describe('ToggleGroup', () => {
  it('lays items out like the web group', async () => {
    await render(<Period value="month" onValueChange={jest.fn()} />);
    expect(screen.getByTestId('group').props.className).toBe('flex-row items-center justify-center gap-1');
  });

  it('passes the group variant to items and highlights the selected one', async () => {
    await render(<Period value="month" onValueChange={jest.fn()} />);
    expect(screen.getByTestId('year').props.className).toContain('border border-input');
    expect(screen.getByTestId('month').props.className.split(' ')).toContain('bg-accent');
    // Substring `.toContain` would false-positive here: outline's base style carries `active:bg-accent`
    // (toggleVariants, Task 22) regardless of selection, so only a discrete-token check tells selected from not.
    expect(screen.getByTestId('year').props.className.split(' ')).not.toContain('bg-accent');
    expect(screen.getByText('Month').props.className).toContain('text-accent-foreground');
  });

  it('selects on press', async () => {
    const onValueChange = jest.fn();
    await render(<Period value="month" onValueChange={onValueChange} />);
    await fireEvent.press(screen.getByTestId('year'));
    expect(onValueChange).toHaveBeenCalledWith('year');
  });

  it('dims every item when the group is disabled', async () => {
    await render(<Period value="month" onValueChange={jest.fn()} disabled />);
    expect(screen.getByTestId('year').props.className).toContain('opacity-50');
    expect(screen.getByTestId('month').props.className).toContain('opacity-50');
  });
  it("multiple: press adds to the selection and every selected item is highlighted", async () => {
    const onValueChange = jest.fn();
    await render(
      <ToggleGroup type="multiple" value={["bold"]} onValueChange={onValueChange}>
        <ToggleGroupItem testID="bold" value="bold" aria-label="Bold">B</ToggleGroupItem>
        <ToggleGroupItem testID="italic" value="italic" aria-label="Italic">I</ToggleGroupItem>
      </ToggleGroup>,
    );
    await fireEvent.press(screen.getByTestId("italic"));
    expect(onValueChange).toHaveBeenCalledWith(["bold", "italic"]);
    expect(screen.getByTestId("bold").props.className.split(" ")).toContain("bg-accent");
    expect(screen.getByTestId("italic").props.className.split(" ")).not.toContain("bg-accent");
  });

  it("wraps mixed children so raw strings never reach the Pressable", async () => {
    await render(
      <ToggleGroup type="single" value="a" onValueChange={jest.fn()}>
        <ToggleGroupItem testID="a" value="a">{1}{" item"}</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByText("1 item")).toBeTruthy();
  });
});
