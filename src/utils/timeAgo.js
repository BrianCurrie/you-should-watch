// Return a string in the format of "2 months ago", "last week", "in 4 years", etc.
export default function timeAgo(date) {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    const divisions = [
        { amount: 60, name: 'seconds' },
        { amount: 60, name: 'minutes' },
        { amount: 24, name: 'hours' },
        { amount: 7, name: 'days' },
        { amount: 4.34524, name: 'weeks' },
        { amount: 12, name: 'months' },
        { amount: Number.POSITIVE_INFINITY, name: 'years' },
    ];

    let duration = (date - new Date()) / 1000;

    for (let i = 0; i < divisions.length; i++) {
        const division = divisions[i];
        if (Math.abs(duration) < division.amount) {
            return rtf.format(Math.round(duration), division.name);
        }
        duration = duration / division.amount;
    }
}
