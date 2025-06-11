export const maskEmail = (email: string) => {
    if (!email) return "";

    const [name, domain] = email.split("@");

    if (name.length <= 2) {
        // If the name is too short, show only the first letter + "*"
        return `${name[0]}*` + `@${domain}`;
    }

    const maskedName = name.slice(0, 2) + "*".repeat(Math.max(0, name.length - 2)); // Prevent -1 issue
    return `${maskedName}@${domain}`;
};
