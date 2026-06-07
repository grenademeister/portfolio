const DATE_OPTIONS = {
    year: "numeric",
    month: "short",
    day: "numeric"
};

const DATE_TIME_OPTIONS = {
    ...DATE_OPTIONS,
    hour: "numeric",
    minute: "2-digit"
};

const dateFormatter = new Intl.DateTimeFormat("en", DATE_OPTIONS);
const dateTimeFormatter = new Intl.DateTimeFormat("en", DATE_TIME_OPTIONS);

export function formatPostDate(date) {
    return date ? dateFormatter.format(new Date(`${date}T00:00:00`)) : "Undated";
}

export function formatCommentDate(date) {
    return dateTimeFormatter.format(new Date(date));
}

export function formatCount(count, singular) {
    return `${count} ${count === 1 ? singular : `${singular}s`}`;
}
