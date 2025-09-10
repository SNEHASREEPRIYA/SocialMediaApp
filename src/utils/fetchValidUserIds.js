// Fetch valid user IDs from dummyjson API
export async function fetchValidUserIds() {
    const response = await fetch('https://dummyjson.com/users');
    const data = await response.json();
    return data.users.map(user => user.id);
}
