
export const WelcomeEmailTemplate = async (email:string, password:string) => {
    return `
    <h2>
        Welcome to Supa-Admin! 
    </h2>
    <br>
    <p>
        Your account informations are here:
        <br><br>
        Email: ${email}
        <br>
        Password: ${password}
    </p>
    <hr>
        `
    }
 