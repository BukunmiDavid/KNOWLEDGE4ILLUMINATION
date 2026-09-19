"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  loadAccessRequests,
  updateAccessRequestStatus,
  grantEmail,
  revokeEmail,
} from "@/lib/auth/access-requests";
import { promoteUserToAdmin, demoteUserFromAdmin, saveSession, getSession } from "@/lib/auth/auth-store";
import type { AccessRequest } from "@/lib/auth/access-requests";
import { cn } from "@/lib/utils";

const statusStyles: Record<AccessRequest["status"], string> = {
  pending: "bg-gold-100 text-gold-700",
  approved: "bg-green-100 text-green-700",
  declined: "bg-red-100 text-red-700",
};

export function EducatorRequests() {
  const [requests, setRequests] = useState<AccessRequest[]>([]);

  const refresh = () => {
    setRequests(loadAccessRequests());
  };

  useEffect(() => {
    (async () => {
      refresh();
    })();
  }, []);

  const approve = (request: AccessRequest) => {
    grantEmail(request.email);
    promoteUserToAdmin(request.email);
    updateAccessRequestStatus(request.id, "approved");
    // If this educator is the currently signed-in user, reflect the role now.
    const session = getSession();
    if (session && session.email === request.email) {
      saveSession({ ...session, role: "admin" });
    }
    refresh();
  };

  const decline = (request: AccessRequest) => {
    updateAccessRequestStatus(request.id, "declined");
    refresh();
  };

  const revoke = (request: AccessRequest) => {
    revokeEmail(request.email);
    demoteUserFromAdmin(request.email);
    refresh();
  };

  const approved = requests.filter((r) => r.status === "approved");

  return (
    <section className="mt-14">
      <h2 className="text-xl font-bold text-ink">Educator access requests</h2>
      <p className="mt-1 text-sm text-muted">
        Approve educators so they can publish their own courses. Their request
        also lands in the platform inbox via email.
      </p>

      {requests.length === 0 ? (
        <Card className="mt-6 border-dashed p-10 text-center">
          <p className="text-sm text-muted">
            No access requests yet. Educators request access from the{" "}
            <span className="font-semibold text-ink">/educator</span> page.
          </p>
        </Card>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {requests.map((request) => {
            const isPending = request.status === "pending";
            const isApproved = request.status === "approved";
            return (
              <Card key={request.id} className="p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider",
                          statusStyles[request.status],
                        )}
                      >
                        {request.status}
                      </span>
                      <span className="text-xs text-faint">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="mt-2 text-base font-bold text-ink">
                      {request.name}
                    </h3>
                    <p className="text-sm text-royal-700">{request.email}</p>
                    {request.organization ? (
                      <p className="text-sm text-muted">
                        {request.organization}
                      </p>
                    ) : null}
                    <p className="mt-2 rounded-xl bg-surface px-3 py-2 text-sm text-ink-soft">
                      {request.message}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 lg:pt-1">
                    {isPending ? (
                      <>
                        <Button variant="gold" size="sm" onClick={() => approve(request)}>
                          Approve
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => decline(request)}
                        >
                          Decline
                        </Button>
                      </>
                    ) : isApproved ? (
                      <>
                        <span className="text-xs font-semibold text-green-600">
                          Access granted
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-faint hover:text-red-600"
                          onClick={() => revoke(request)}
                        >
                          Revoke
                        </Button>
                      </>
                    ) : (
                      <span className="text-xs text-faint">Declined</span>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {approved.length > 0 ? (
        <p className="mt-4 text-xs text-faint">
          Approved educators can manage courses from their account after signing
          out and back in (or immediately if they are the currently signed-in user).
        </p>
      ) : null}
    </section>
  );
}