import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

// add type for all attributes of ul element
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/1349b640d4d07f40aa7c1c6931f18e3fbf667f3a/types/react/index.d.ts#L3080
type UListElement = DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>;

// PropsWithChildren<TUList<T>> would add children prop
type TUList<T> = UListElement & {
  items: T[];
  render: (item: T) => ReactNode;
  handleItemClick: (item: T) => void;
};

export const UList = <T extends { id: string; text: string }>({
  items,
  render,
  handleItemClick,
  className,
}: TUList<T>) => {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.id} onClick={() => handleItemClick(item)}>
          {render(item)}
        </li>
      ))}
    </ul>
  );
};
