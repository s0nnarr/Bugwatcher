export const refreshOptions = {
    httpOnly: true,
    maxAge: 60000 * 60 * 24 * 2, // 2 days
    sameSite: 'Strict',
    secure: process.env.NODE_ENV === 'production'
};

export const accessOptions = {
    httpOnly: true,
    maxAge: 60000 * 60 * 24 * 2,
    sameSite: 'Strict',
    secure: process.env.NODE_ENV === 'production'
}
