const port = process.env.PORT || 3000
const jwtAccessSecret = process.env.JWT_ACCESS_SECRET
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET
const adminEmail = process.env.ADMIN_EMAIL
const adminPassword = process.env.ADMIN_PASSWORD

if (!jwtAccessSecret) throw new Error("Environment variable JWT_ACCESS_SECRET not found!")
if (!jwtRefreshSecret) throw new Error("Environment variable JWT_REFRESH_SECRET not found!")
if (!adminEmail) throw new Error("Environment variable ADMIN_EMAIL not found!")
if (!adminPassword) throw new Error("Environment variable ADMIN_PASSWORD not found!")

export default {
    port,
    jwtAccessSecret,
    jwtRefreshSecret,
    adminEmail,
    adminPassword
}