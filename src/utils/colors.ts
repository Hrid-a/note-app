const colors:{[key:string]:string} = {
    "--color-red-100": "hsl(356, 100%, 92%)",
    '--color-red-500': "hsl(355, 96%, 60%)",
    "--color-green-100": "hsl(154, 84%, 90%)",
    "--color-green-500": "hsl(148, 71%, 44%)",
    "--color-blue-100": "hsl(222, 100%, 96%)",
    "--color-blue-500": "hsl(228, 100%, 60%)",
    "--color-blue-700": "hsl(228, 70%, 48%)",
    "--color-white": "hsl(0, 0%, 100%)",
    "--color-gray-50": "hsl(216, 33%, 97%)",
    "--color-gray-100": "hsl(210, 26%, 96%)",
    "--color-gray-200": "hsl(216, 19%, 90%)",
    "--color-gray-300": "hsl(219, 15%, 82%)",
    "--color-gray-400": "hsl(220, 11%, 64%)",
    "--color-gray-500": "hsl(221, 8%, 48%)",
    "--color-gray-600": "hsl(222, 11%, 36%)",
    "--color-gray-700": "hsl(221, 16%, 20%)",
    "--color-gray-800": "hsl(231, 16%, 16%)",
    "--color-gray-900": "hsl(230, 19%, 12%)",
    "--color-black": "hsl(222, 32%, 8%)",
}


export const LIGHT_TOKENS:{[key:string]:string} = {
    "--color-background": "hsl(0, 0%, 100%)",
    "--color-text": "hsl(222, 32%, 8%)",
    "--color-primary": "hsl(228, 100%, 60%)",
    "--color-primary-700": "hsl(228, 70%, 48%)",
    "--color-gray-50": "hsl(216, 33%, 97%)",
    "--color-gray-100": "hsl(210, 26%, 96%)",
    "--color-gray-200": "hsl(216, 19%, 90%)",
    "--color-gray-300": "hsl(219, 15%, 82%)",
    "--color-gray-400": "hsl(220, 11%, 64%)",
    "--color-gray-500": "hsl(221, 8%, 48%)",
    "--color-gray-600": "hsl(222, 11%, 36%)",
    "--color-gray-700": "hsl(221, 16%, 20%)",
    "--color-gray-800": "hsl(231, 16%, 16%)",
    "--color-gray-900": "hsl(230, 19%, 12%)",
    "--color-error-100": "hsl(356, 100%, 92%)",
    '--color-error-500': "hsl(355, 96%, 60%)",
}

LIGHT_TOKENS["--color-decorative"] = colors["--color-blue-100"];


export const DARK_TOKENS:{[key:string]:string} = {
    "--color-background": "hsl(222, 32%, 8%)",
    "--color-text": "hsl(0, 0%, 100%)",
    "--color-primary": "hsl(228, 100%, 60%)",
    "--color-primary-700": "hsl(228, 70%, 48%)",
    "--color-gray-900": "hsl(216, 33%, 97%)",
    "--color-gray-800": "hsl(210, 26%, 96%)",
    "--color-gray-700": "hsl(216, 19%, 90%)",
    "--color-gray-600": "hsl(219, 15%, 82%)",
    "--color-gray-500": "hsl(220, 11%, 64%)",
    "--color-gray-400": "hsl(221, 8%, 48%)",
    "--color-gray-300": "hsl(222, 11%, 36%)",
    "--color-gray-200": "hsl(221, 16%, 20%)",
    "--color-gray-100": "hsl(231, 16%, 16%)",
    "--color-gray-50": "hsl(230, 19%, 12%)",
    "--color-error-100": "hsl(356, 100%, 92%)",
    '--color-error-500': "hsl(355, 96%, 60%)",
}
DARK_TOKENS["--color-decorative"] = colors["--color-gray-700"];