import { modifyTopPaddingRelative } from "@/app/utils";

export function InterestAnimFloatUp(element, delayBeforeMove) {
    setTimeout(() => {
        modifyTopPaddingRelative("-1.5em", element.className);
    }, delayBeforeMove);
}
