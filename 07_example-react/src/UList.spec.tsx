import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { UList } from './UList';

describe('UList Component', () => {
  const items = [
    { id: '1', text: 'Item 1' },
    { id: '2', text: 'Item 2' },
    { id: '3', text: 'Item 3' },
  ];
  const renderItem = (item: typeof items[number]) => <span>{item.text}</span>;
  const handleItemClick = vi.fn();

  beforeEach(() => {
    handleItemClick.mockClear();
  });

  it('renders a list of items', () => {
    render(<UList items={items} render={renderItem} handleItemClick={handleItemClick} />);

    const listItems = screen.getAllByRole('listitem');

    expect(listItems).toHaveLength(items.length);

    listItems.forEach((item, index) => {
      expect(item).toHaveTextContent(items[index].text);
    });
  });

  it('calls handleItemClick when an item is clicked', async () => {
    render(<UList items={items} render={renderItem} handleItemClick={handleItemClick} />);

    const listItems = screen.getAllByRole('listitem');

    for (let i = 0; i < listItems.length; i++) {
      await userEvent.click(listItems[i]);
      expect(handleItemClick).toHaveBeenCalledWith(items[i]);
    }
  });
});
