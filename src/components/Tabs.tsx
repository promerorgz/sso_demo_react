import React, { useId, useEffect, useRef, useState } from "react";

type TabProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  id?: string;
  disabled?: boolean;
};

type TabsProps = {
  children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[];
  defaultIndex?: number;
  onChange?: (index: number) => void;
  className?: string;
};

/**
 * Simple accessible Tabs component.
 *
 * Usage:
 * <Tabs defaultIndex={0}>
 *   <Tabs.Tab title="One">Content One</Tabs.Tab>
 *   <Tabs.Tab title="Two">Content Two</Tabs.Tab>
 * </Tabs>
 */

export const Tab: React.FC<TabProps> = ({ children }) => {
  // Tab is just a marker component; rendering is handled by Tabs.
  return <>{children}</>;
};

const isValidTabElement = (el: any): el is React.ReactElement<TabProps> =>
  React.isValidElement(el) &&
  (el.type === Tab || (el.type as any).displayName === "Tab");

export default function Tabs({
  children,
  defaultIndex = 0,
  onChange,
  className,
}: TabsProps) {
  const idBase = useId();
  const childArray = React.Children.toArray(children).filter(
    isValidTabElement
  ) as React.ReactElement<TabProps>[];
  const normalizedDefault = Math.min(
    Math.max(defaultIndex, 0),
    Math.max(0, childArray.length - 1)
  );
  const [activeIndex, setActiveIndex] = useState<number>(normalizedDefault);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    // clamp activeIndex if children length changes
    if (activeIndex >= childArray.length) {
      setActiveIndex(Math.max(0, childArray.length - 1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childArray.length]);

  useEffect(() => {
    onChange?.(activeIndex);
  }, [activeIndex, onChange]);

  const focusTab = (index: number) => {
    const btn = tabsRef.current[index];
    if (btn) btn.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    let nextIndex = -1;
    switch (e.key) {
      case "ArrowRight":
        nextIndex = findNextEnabled(i, 1);
        break;
      case "ArrowLeft":
        nextIndex = findNextEnabled(i, -1);
        break;
      case "Home":
        nextIndex = findNextEnabled(0, 1, true);
        break;
      case "End":
        nextIndex = findNextEnabled(childArray.length - 1, -1, true);
        break;
      case "Enter":
      case " ":
        setActiveIndex(i);
        return;
      default:
        return;
    }
    e.preventDefault();
    if (nextIndex >= 0) {
      focusTab(nextIndex);
      // move selection when arrow keys (common pattern: selection follows focus)
      setActiveIndex(nextIndex);
    }
  };

  const findNextEnabled = (start: number, step: number, anchored = false) => {
    const len = childArray.length;
    if (len === 0) return -1;
    if (anchored) {
      // anchored start is either 0 (Home) or last index (End)
      for (let i = start; i >= 0 && i < len; i += step) {
        if (!childArray[i].props.disabled) return i;
      }
      return -1;
    }
    let i = start + step;
    for (let iter = 0; iter < len; iter++, i += step) {
      if (i < 0) i = len - 1;
      if (i >= len) i = 0;
      if (!childArray[i].props.disabled) return i;
    }
    return -1;
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        style={{ display: "flex", gap: 8 }}
      >
        {childArray.map((child, i) => {
          const tabId = child.props.id ?? `${idBase}-tab-${i}`;
          const panelId = `${idBase}-panel-${i}`;
          const selected = i === activeIndex;
          const disabled = !!child.props.disabled;
          return (
            <button
              key={tabId}
              id={tabId}
              ref={(el) => (tabsRef.current[i] = el)}
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              disabled={disabled}
              onClick={() => !disabled && setActiveIndex(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className="p-4 text-black"
              style={{
                padding: "8px 12px",
                cursor: disabled ? "not-allowed" : "pointer",
                border: selected ? "2px solid #0078d4" : "1px solid #ddd",
                background: selected ? "#f0f8ff" : "white",
                borderRadius: 4,
              }}
            >
              {child.props.title}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 12 }}>
        {childArray.map((child, i) => {
          const panelId = `${idBase}-panel-${i}`;
          const tabId = child.props.id ?? `${idBase}-tab-${i}`;
          const hidden = i !== activeIndex;
          return (
            <div
              key={panelId}
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId}
              hidden={hidden}
              style={{ outline: "none" }}
            >
              {!hidden && child.props.children}
            </div>
          );
        })}
      </div>
    </div>
  );
}

Tabs.Tab = Tab;
Tabs.displayName = "Tabs";
Tab.displayName = "Tab";
