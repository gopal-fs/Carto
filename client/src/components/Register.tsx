import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type User = {
    email: string;
    password: string;
    phone: string;
    location: string;
    latitude: number | null;
    longitude: number | null;
};

const Register = () => {
    const [checked, setChecked] = useState<boolean>(false);
    const [locationLocked, setLocationLocked] = useState<boolean>(true);

    const [user, setUser] = useState<User>({
        email: "",
        password: "",
        phone: "",
        location: "",
        latitude: null,
        longitude: null,
    });

    const getLocation = () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser");
            setLocationLocked(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
                        {
                            headers: {
                                Accept: "application/json",
                            },
                        }
                    );

                    const data = await res.json();

                    const cityName =
                        data?.address?.city ||
                        data?.address?.town ||
                        data?.address?.village ||
                        data?.address?.state ||
                        "";

                    setUser((prev) => ({
                        ...prev,
                        location: cityName,
                        latitude: lat,
                        longitude: lon,
                    }));

                    setLocationLocked(true);

                } catch {
                    toast.error("Failed to fetch enter manually.");
                    setLocationLocked(false);
                }
            },
            (err) => {
                if (err.code === 1) {
                    toast.error(
                        "Location Access Needed"
                    );
                } else {
                    toast.error("Unable to get your location.");
                }

                setLocationLocked(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };


    useEffect(() => {
        getLocation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <form className="flex flex-col mt-3 gap-5">
            <input
                type="email"
                required
                value={user.email}
                onChange={(e) =>
                    setUser((prev) => ({ ...prev, email: e.target.value }))
                }
                className="flex-1 px-3 outline-0 py-2 border border-gray-300 bg-white placeholder:text-gray-400 rounded-[12px]"
                placeholder="Enter your email..."
            />

            <input
                type="password"
                required
                value={user.password}
                onChange={(e) =>
                    setUser((prev) => ({ ...prev, password: e.target.value }))
                }
                className="flex-1 px-3 outline-0 py-2 border border-gray-300 bg-white placeholder:text-gray-400 rounded-[12px]"
                placeholder="Enter your password..."
            />

            <input
                type="tel"
                required
                pattern="[0-9]{10}"
                value={user.phone}
                onChange={(e) =>
                    setUser((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="flex-1 px-3 outline-0 py-2 border border-gray-300 bg-white placeholder:text-gray-400 rounded-[12px]"
                placeholder="Enter your number..."
            />

            <input
                type="text"
                required
                value={user.location}
                readOnly={locationLocked}
                onChange={(e) =>
                    setUser((prev) => ({ ...prev, location: e.target.value }))
                }
                className="flex-1 px-3 outline-0 py-2 border border-gray-300 bg-white placeholder:text-gray-400 rounded-[12px]"
                placeholder="Detecting your location..."
            />

            <div className="flex gap-1 items-center">
                <input
                    onChange={() => setChecked((prev) => !prev)}
                    className="h-3 w-7"
                    type="checkbox"
                    required
                />
                <p
                    className={`text-sm ${checked ? "text-[#151312]" : "text-gray-400"
                        }`}
                >
                    Agree to the terms of use & privacy policy.
                </p>
            </div>

            <div className="w-full flex justify-center">
                <button className="bg-[#6366f1] hover:bg-[#585cf0] mt-1 text-white h-[40px] w-[200px] rounded-full cursor-pointer">
                    Create Account
                </button>
            </div>

            <div className="flex items-center justify-center gap-3">
                <hr className="w-30 border-gray-300" />
                <span className="text-gray-400 text-xs font-medium">OR</span>
                <hr className="w-30 border-gray-300" />
            </div>

            <div className="flex justify-center">
                <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-full cursor-pointer bg-[#6366f1] hover:bg-[#585cf0] text-white text-sm font-medium h-[40px] px-5 shadow-sm"
                >
                    <img src="/google.png" className="h-[18px] w-[18px]" alt="google" />
                    Continue with Google
                </button>
            </div>
        </form>
    );
};

export default Register;