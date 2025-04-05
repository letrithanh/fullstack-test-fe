export default class DateFormatter {
    public static format(date: Date, pattern: string): string {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear());

        const patternReplacements: { [key: string]: string } = {
            dd: day,
            MM: month,
            yyyy: year,
        };

        let formattedDate = pattern;
        for (const key in patternReplacements) {
            formattedDate = formattedDate.replace(
                key,
                patternReplacements[key]
            );
        }

        return formattedDate;
    }
}
