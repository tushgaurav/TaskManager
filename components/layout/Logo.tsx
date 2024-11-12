import React from 'react';

type LogoSize = 'small' | 'medium' | 'large' | 'xl';

export default function Logo({ size }: { size?: LogoSize }) {
    let width, height;

    switch (size) {
        case 'small':
            width = '5em';
            height = '1.34em';
            break;
        case 'medium':
            width = '7.4em';
            height = '2em';
            break;
        case 'large':
            width = '10em';
            height = '2.7em';
            break;
        case 'xl':
            width = '13em';
            height = '3.5em';
            break;
        default:
            width = '7.4em';
            height = '2em';
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill="none"
            viewBox="0 0 517 140"
        >
            <g clipPath="url(#logoWithText_svg__a)">
                <rect width={140} height={140} fill="#0082FF" rx={36} />
                <g filter="url(#logoWithText_svg__b)">
                    <path
                        fill="url(#logoWithText_svg__c)"
                        fillRule="evenodd"
                        d="M65.14 64.627c-.27.27-.079.73.302.73h21.91a5.128 5.128 0 0 1 4.805 6.92 5.107 5.107 0 0 1-1.214 1.929L55.727 109.42a5.127 5.127 0 1 1-7.252-7.251l25.83-25.829a.427.427 0 0 0-.303-.73H52.028a5.128 5.128 0 0 1-3.518-8.858L83.633 31.63a5.127 5.127 0 1 1 7.252 7.252L65.14 64.627Z"
                        clipRule="evenodd"
                        shapeRendering="crispEdges"
                    />
                </g>
                <g filter="url(#logoWithText_svg__d)">
                    <rect
                        width="32.428"
                        height="8.737"
                        fill="url(#logoWithText_svg__e)"
                        rx="4.369"
                        transform="rotate(-45 95.164 -51.08)"
                    />
                </g>
                <g filter="url(#logoWithText_svg__f)">
                    <circle cx="87.636" cy="35.161" r="3.703" fill="#FDFEFF" />
                </g>
            </g>
            <path
                fill="#0080FF"
                d="M175.091 82.14h9.765c.313 2.579 1.641 4.662 3.985 6.25 2.343 1.563 5.247 2.344 8.711 2.344 3.385 0 6.145-.755 8.281-2.265 2.161-1.51 3.242-3.438 3.242-5.781 0-2.032-.781-3.672-2.344-4.922-1.562-1.276-4.114-2.331-7.656-3.164l-7.305-1.72c-5.182-1.197-9.036-3.06-11.562-5.585-2.5-2.526-3.75-5.807-3.75-9.844 0-4.974 1.953-9.01 5.859-12.11 3.906-3.098 8.945-4.648 15.117-4.648 6.198 0 11.185 1.537 14.961 4.61 3.802 3.047 5.769 7.057 5.899 12.03h-9.61c-.234-2.63-1.367-4.687-3.398-6.17-2.031-1.511-4.675-2.267-7.93-2.267-3.177 0-5.755.717-7.734 2.149-1.953 1.432-2.93 3.32-2.93 5.664 0 1.875.755 3.398 2.266 4.57 1.536 1.172 4.036 2.175 7.5 3.008l6.484 1.484c5.703 1.303 9.844 3.204 12.422 5.704 2.578 2.5 3.867 5.846 3.867 10.039 0 5.338-2.005 9.583-6.015 12.734-3.985 3.125-9.388 4.688-16.211 4.688-6.511 0-11.745-1.498-15.703-4.493-3.933-3.02-6.003-7.122-6.211-12.304Zm89.1-25.546V98h-9.375v-7.188h-.196c-2.291 5.287-6.51 7.93-12.656 7.93-4.505 0-8.086-1.367-10.742-4.101-2.63-2.76-3.945-6.524-3.945-11.29V56.595h9.726v24.804c0 2.97.703 5.235 2.109 6.797 1.433 1.563 3.516 2.344 6.25 2.344 2.787 0 5-.911 6.641-2.734s2.461-4.245 2.461-7.266V56.594h9.727Zm32.303-.703c5.26 0 9.44 1.914 12.539 5.742 3.099 3.828 4.648 9.05 4.648 15.664 0 6.588-1.536 11.797-4.609 15.625-3.073 3.828-7.214 5.742-12.422 5.742-2.969 0-5.586-.664-7.852-1.992-2.265-1.354-3.971-3.203-5.117-5.547h-.195v20.508h-9.727v-55.04h9.493v7.15h.195c1.198-2.449 2.93-4.363 5.195-5.743 2.266-1.406 4.883-2.11 7.852-2.11Zm-2.969 34.804c3.151 0 5.638-1.198 7.461-3.593 1.823-2.422 2.734-5.69 2.734-9.805 0-4.089-.924-7.344-2.773-9.766-1.823-2.422-4.297-3.633-7.422-3.633-3.021 0-5.456 1.224-7.305 3.672-1.849 2.448-2.786 5.69-2.812 9.727.026 4.062.963 7.318 2.812 9.766 1.849 2.421 4.284 3.632 7.305 3.632Zm45.858-27.422c-2.709 0-4.974.938-6.797 2.813-1.797 1.849-2.8 4.232-3.008 7.148h19.336c-.104-2.942-1.029-5.338-2.773-7.187-1.745-1.85-3.998-2.774-6.758-2.774Zm9.57 22.344h9.102c-.625 3.932-2.617 7.123-5.977 9.57-3.359 2.422-7.474 3.633-12.344 3.633-6.198 0-11.067-1.9-14.609-5.703-3.542-3.828-5.313-9.05-5.313-15.664 0-6.562 1.758-11.823 5.274-15.781 3.542-3.958 8.294-5.938 14.258-5.938 5.859 0 10.508 1.888 13.945 5.664 3.438 3.75 5.156 8.776 5.156 15.079v3.164H329.5v.586c0 3.333.938 6.015 2.812 8.046 1.902 2.032 4.441 3.047 7.618 3.047 2.239 0 4.166-.507 5.781-1.523 1.641-1.042 2.721-2.435 3.242-4.18ZM366.334 98V56.594h9.336v7.226h.196c.703-2.526 1.914-4.479 3.632-5.86 1.745-1.38 3.842-2.07 6.289-2.07.86 0 1.875.13 3.047.391v8.79c-.963-.365-2.278-.548-3.945-.548-2.76 0-4.922.834-6.484 2.5-1.563 1.667-2.344 3.959-2.344 6.875V98h-9.727Zm30.077-56.367h20.586c8.437 0 15.013 2.448 19.726 7.344 4.714 4.895 7.071 11.796 7.071 20.703 0 8.932-2.357 15.885-7.071 20.86-4.713 4.973-11.289 7.46-19.726 7.46h-20.586V41.633Zm10.078 8.515v39.336h9.453c5.677 0 10.026-1.692 13.047-5.078 3.021-3.385 4.531-8.281 4.531-14.687 0-6.302-1.523-11.133-4.57-14.492-3.047-3.386-7.383-5.079-13.008-5.079h-9.453ZM511.566 98h-9.063V58h-.273l-16.289 39.531h-6.875L462.777 58h-.274v40h-9.101V41.633h11.679l17.266 42.539h.312l17.266-42.54h11.641V98Z"
            />
            <defs>
                <filter
                    id="logoWithText_svg__b"
                    width="59.252"
                    height="94.468"
                    x="40.063"
                    y="25.001"
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        result="hardAlpha"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy="1.709" />
                    <feGaussianBlur stdDeviation="3.418" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix values="0 0 0 0 0.0732091 0 0 0 0 0.443172 0 0 0 0 0.806087 0 0 0 0.6 0" />
                    <feBlend
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_7147_55907"
                    />
                    <feBlend
                        in="SourceGraphic"
                        in2="effect1_dropShadow_7147_55907"
                        result="shape"
                    />
                </filter>
                <filter
                    id="logoWithText_svg__d"
                    width="43.72"
                    height="43.72"
                    x="56.686"
                    y="22.094"
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur
                        result="effect1_foregroundBlur_7147_55907"
                        stdDeviation="4.558"
                    />
                </filter>
                <filter
                    id="logoWithText_svg__f"
                    width="75.775"
                    height="75.775"
                    x="49.749"
                    y="-2.727"
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur
                        result="effect1_foregroundBlur_7147_55907"
                        stdDeviation="17.092"
                    />
                </filter>
                <linearGradient
                    id="logoWithText_svg__c"
                    x1="92.479"
                    x2="49.464"
                    y1="30.033"
                    y2="110.935"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#fff" />
                    <stop offset={1} stopColor="#fff" stopOpacity="0.7" />
                </linearGradient>
                <linearGradient
                    id="logoWithText_svg__e"
                    x1="32.933"
                    x2="-2.322"
                    y1="4.698"
                    y2="5.165"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0.475" stopColor="#fff" />
                    <stop offset={1} stopColor="#F0F7FF" stopOpacity={0} />
                </linearGradient>
                <clipPath id="logoWithText_svg__a">
                    <rect width={140} height={140} fill="#fff" rx={36} />
                </clipPath>
            </defs>
        </svg>
    );
};
