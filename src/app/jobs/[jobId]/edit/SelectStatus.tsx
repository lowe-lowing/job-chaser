"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateApplication } from "@/lib/server/applications";
import { Status } from "@prisma/client";
import { type FC } from "react";

interface SelectStatusProps {
  applicationId: number;
  currentStatus: string;
}

const SelectStatus: FC<SelectStatusProps> = ({ applicationId, currentStatus }) => {
  return (
    <Select onValueChange={(status) => updateApplication({ applicationId, status })}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Update Status" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(Status).map((status, i) => (
          <SelectItem key={i} disabled={status === currentStatus} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectStatus;
