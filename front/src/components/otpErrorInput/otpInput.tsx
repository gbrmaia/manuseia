"use client";

import * as React from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";

interface InputOTPControllerProps {
    value?: string;
    onChange?: (value: string) => void;
}

export function InputOTPController({ value, onChange }: InputOTPControllerProps) {
    return (
        <div className="">
            <InputOTP
                maxLength={6}
                value={value}
                onChange={onChange}
                required
            >
                <InputOTPGroup>
                    <InputOTPSlot index={0} className="size-9" />
                    <InputOTPSlot index={1} className="size-9" />
                    <InputOTPSlot index={2} className="size-9" />
                    <InputOTPSlot index={3} className="size-9" />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={4} className="size-9" />
                    <InputOTPSlot index={5} className="size-9" />
                </InputOTPGroup>
            </InputOTP>
        </div>
    );
}
