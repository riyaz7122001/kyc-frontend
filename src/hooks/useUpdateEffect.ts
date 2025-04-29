import { DependencyList, useEffect, useRef } from "react";

export default function useUpdateEffect(effect: Function, dependencies: DependencyList) {
    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            return effect();
        }
    }, dependencies);
}
