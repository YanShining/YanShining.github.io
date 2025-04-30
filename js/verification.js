// verification.js

// Helper function to get cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Helper function to set cookie expiring at the end of the day
function setEndOfDayCookie(name, value) {
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    document.cookie = `${name}=${value}; expires=${endOfDay.toUTCString()}; path=/`;
}

// Simple hash function (using SHA-256 requires a library, so we'll use a simpler approach)
// This is NOT cryptographically secure, but matches the requirement for simple client-side generation.
async function generateSimpleHash(str) {
    // Basic string manipulation to create a pseudo-hash
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    // Convert to positive hex string and take first 6 chars
    let hexHash = (hash >>> 0).toString(16).toUpperCase();
    while (hexHash.length < 6) {
        hexHash = '0' + hexHash; // Pad if needed
    }
    return hexHash.substring(0, 6);
}

// Generate the daily verification code
async function getDailyVerificationCode(salt) {
    const today = new Date();
    const dateString = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
    const code = await generateSimpleHash(dateString + salt);
    console.log(`Generated code for ${dateString}: ${code}`); // For debugging
    return code;
}

// Create and show the verification modal
function showVerificationModal(onSubmit) {
    // Check if modal already exists
    if (document.getElementById('verification-modal')) {
        return;
    }

    const modalHTML = `
        <div id="verification-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 9999;">
            <div style="background-color: white; padding: 30px; border-radius: 8px; text-align: center;">
                <h3 style="margin-top: 0; margin-bottom: 15px;">请输入验证码</h3>
                <input type="text" id="verification-input" style="padding: 10px; margin-bottom: 15px; width: 150px; text-align: center; font-size: 1.1em;" maxlength="6">
                <button id="verification-submit" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1em;">提交</button>
                <p id="verification-error" style="color: red; margin-top: 10px; min-height: 1em;"></p>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const submitButton = document.getElementById('verification-submit');
    const inputField = document.getElementById('verification-input');
    const errorMsg = document.getElementById('verification-error');

    submitButton.addEventListener('click', () => {
        const enteredCode = inputField.value.trim().toUpperCase();
        onSubmit(enteredCode);
    });

    // Allow submission with Enter key
    inputField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            submitButton.click();
        }
    });
}

// Hide and remove the verification modal
function hideVerificationModal() {
    const modal = document.getElementById('verification-modal');
    if (modal) {
        modal.remove();
    }
}

// Main verification function
async function checkVerification() {
    // Check if verification is enabled in config
    if (CONFIG.enableVerification === false) {
        console.log('Verification is disabled in config.');
        return; // Skip verification if disabled
    }

    const cookieName = 'verifiedUser';
    const verificationSalt = CONFIG.verificationSalt || 'defaultSalt'; // Use salt from config or a default

    if (getCookie(cookieName) === 'true') {
        console.log('User already verified today.');
        return; // Already verified today
    }

    const correctCode = await getDailyVerificationCode(verificationSalt);

    showVerificationModal((enteredCode) => {
        const errorMsg = document.getElementById('verification-error');
        if (enteredCode === correctCode) {
            setEndOfDayCookie(cookieName, 'true');
            hideVerificationModal();
            console.log('Verification successful.');
            // Optional: Reload or initialize main content if needed
            // window.location.reload(); // Or call an init function
        } else {
            console.log(`Verification failed. Entered: ${enteredCode}, Expected: ${correctCode}`);
            if (errorMsg) {
                 errorMsg.textContent = '验证码错误，请重试。';
            }
            const inputField = document.getElementById('verification-input');
            if (inputField) {
                inputField.value = ''; // Clear input on error
                inputField.focus();
            }
        }
    });
}

// Run verification check when the script loads (or call this from HTML)
// Ensure CONFIG is loaded before calling this.
// We will call this explicitly from each HTML page after CONFIG is available.
// checkVerification();