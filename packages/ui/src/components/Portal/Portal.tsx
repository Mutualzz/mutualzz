import getReactElementRef from "@utils/getReactElementRef";
import { setRef } from "@utils/setRef";
import { useEnhancedEffect } from "@utils/useEnhancedEffect";
import { useForkRef } from "@utils/useForkRef";
import { cloneElement, isValidElement, useState, type Ref } from "react";
import { createPortal } from "react-dom";
import { type PortalProps } from "./Portal.types";

function getContainer(container: PortalProps["container"]) {
    return typeof container === "function" ? container() : container;
}

/**
 * Portal component for rendering children into a different part of the DOM.
 */
const Portal = (
    { children, container, disablePortal = false }: PortalProps,
    forwardedRef?: Ref<HTMLElement>,
) => {
    const [mountNode, setMountNode] = useState<ReturnType<
        typeof getContainer
    > | null>(null);

    const handleRef = useForkRef(
        isValidElement(children) ? getReactElementRef(children) : null,
        forwardedRef,
    );

    useEnhancedEffect(() => {
        if (!disablePortal) {
            setMountNode(getContainer(container) || document.body);
        }
    }, [container, disablePortal]);

    useEnhancedEffect(() => {
        if (mountNode && !disablePortal) {
            setRef(forwardedRef, mountNode);
            return () => {
                setRef(forwardedRef, null);
            };
        }

        return undefined;
    }, [forwardedRef, mountNode, disablePortal]);

    if (disablePortal) {
        if (isValidElement(children)) {
            const newProps = {
                ref: handleRef,
            };
            return cloneElement(children, newProps);
        }
        return children;
    }

    return mountNode ? createPortal(children, mountNode) : mountNode;
};

Portal.displayName = "Portal";

export { Portal };
