export const CLASS_JOINER = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(" ");
};
