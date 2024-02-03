export const parseUrl = (url: string)  => {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)$/);
    if (match) {
        const [_, author, repo] = match;
//            console.log("Author is: ", author )
//            console.log("Repo is: ", repo )
        return { author, repo };
    } else {
        throw new Error('Invalid GitHub URL format');
    }
};