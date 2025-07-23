export const copyToClipboard = (copy: string) => {
    navigator.clipboard.writeText(copy)
        .then(() => {
            console.log("Address copied to clipboard!");
        })
        .catch((error) => {
            console.error("Failed to copy text: ", error);
        });
};