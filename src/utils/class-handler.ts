export const CLASS_JOINER = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
};
