"use client";

export default function Loading() {
    return (
        <div className="globalLoaderNotTransition">
            <Image src="/loading-animation.gif" alt="Loading..." style={{ width: 180, height: 180 }} />
        </div>
    );
}