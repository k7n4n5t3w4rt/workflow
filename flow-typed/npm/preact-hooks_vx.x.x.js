// @flow

declare module 'preact/hooks' {
  declare export function useCallback<T: (...args: any[]) => any>(
    callback: T,
    inputs: $ReadOnlyArray<mixed>,
  ): T;
  declare export function useContext<T>(context: React$Context<T>): T;
  declare export function useEffect(
    create: () => (() => void) | void,
    inputs: $ReadOnlyArray<mixed> | void | null,
  ): void;
  declare export function useLayoutEffect(
    create: () => (() => void) | void,
    inputs: $ReadOnlyArray<mixed> | void | null,
  ): void;
  declare export function useMemo<T>(
    create: () => T,
    inputs: $ReadOnlyArray<mixed> | void | null,
  ): T;
  declare export function useReducer<S, A>(
    reducer: (S, A) => S,
    initialState: S,
  ): [S, (A) => void];
  declare export function useRef<T>(initialValue: T): { current: T };
  declare export function useState<S>(
    initialState: (() => S) | S,
  ): [S, ((S => S) | S) => void];
}
