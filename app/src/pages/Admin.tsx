import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import {
  Users,
  MessageSquare,
  Mail,
  UserCheck,
  Trash2,
  Shield,
  ArrowLeft,
  Loader2,
} from "lucide-react";

export default function Admin() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
    if (!isLoading && isAuthenticated && user?.role !== "admin") {
      navigate("/");
    }
  }, [isLoading, isAuthenticated, user, navigate]);

  const utils = trpc.useUtils();
  const { data: allUsers, isLoading: usersLoading } = trpc.user.list.useQuery(undefined, {
    enabled: user?.role === "admin",
  });
  const { data: contacts, isLoading: contactsLoading } = trpc.contact.list.useQuery(undefined, {
    enabled: user?.role === "admin",
  });
  const { data: subscribers, isLoading: subsLoading } = trpc.subscriber.list.useQuery(undefined, {
    enabled: user?.role === "admin",
  });

  const deleteContact = trpc.contact.delete.useMutation({
    onSuccess: () => utils.contact.list.invalidate(),
  });
  const deleteSubscriber = trpc.subscriber.delete.useMutation({
    onSuccess: () => utils.subscriber.list.invalidate(),
  });
  const updateRole = trpc.user.updateRole.useMutation({
    onSuccess: () => utils.user.list.invalidate(),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#C9A84C] animate-spin" />
      </div>
    );
  }

  if (user?.role !== "admin") return null;

  const stats = [
    { label: "Total Users", value: allUsers?.length ?? 0, icon: Users, color: "bg-[#C9A84C]/15 text-[#C9A84C]" },
    { label: "Contact Messages", value: contacts?.length ?? 0, icon: MessageSquare, color: "bg-blue-500/15 text-blue-400" },
    { label: "Subscribers", value: subscribers?.length ?? 0, icon: Mail, color: "bg-green-500/15 text-green-400" },
    { label: "Admins", value: allUsers?.filter((u) => u.role === "admin").length ?? 0, icon: Shield, color: "bg-purple-500/15 text-purple-400" },
  ];

  return (
    <div className="min-h-screen bg-[#0A1628]">
      {/* Header */}
      <div className="bg-[#0F1D32] border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Site
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#C9A84C]" />
            <span className="text-white text-sm font-medium">Admin Dashboard</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-[#0F1D32] border border-white/5 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`h-10 w-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <span className="text-2xl font-bold text-white">{stat.value}</span>
              </div>
              <p className="text-white/50 text-xs uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Messages */}
          <div className="bg-[#0F1D32] border border-white/5 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-white font-semibold text-sm">Contact Messages</h3>
              <span className="text-white/30 text-xs">{contacts?.length ?? 0} total</span>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {contactsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-5 w-5 text-[#C9A84C] animate-spin" />
                </div>
              ) : contacts && contacts.length > 0 ? (
                <div className="divide-y divide-white/5">
                  {contacts.map((c) => (
                    <div key={c.id} className="px-5 py-4 hover:bg-white/5 transition-colors group">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="text-white text-sm font-medium truncate">{c.name}</p>
                          <p className="text-white/40 text-xs">{c.email}</p>
                          {c.subject && (
                            <p className="text-[#C9A84C]/70 text-xs mt-1">{c.subject}</p>
                          )}
                          <p className="text-white/50 text-sm mt-2 line-clamp-2">{c.message}</p>
                        </div>
                        <button
                          onClick={() => deleteContact.mutate({ id: c.id })}
                          className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-white/30 text-sm">No messages yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Subscribers */}
          <div className="bg-[#0F1D32] border border-white/5 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-white font-semibold text-sm">Newsletter Subscribers</h3>
              <span className="text-white/30 text-xs">{subscribers?.length ?? 0} total</span>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {subsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-5 w-5 text-[#C9A84C] animate-spin" />
                </div>
              ) : subscribers && subscribers.length > 0 ? (
                <div className="divide-y divide-white/5">
                  {subscribers.map((s) => (
                    <div key={s.id} className="px-5 py-3 hover:bg-white/5 transition-colors group flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="text-white text-sm truncate">{s.email}</p>
                        <p className="text-white/30 text-xs">{new Date(s.createdAt).toLocaleDateString()}</p>
                      </div>
                      <button
                        onClick={() => deleteSubscriber.mutate({ id: s.id })}
                        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all shrink-0 ml-3"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-white/30 text-sm">No subscribers yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="mt-8 bg-[#0F1D32] border border-white/5 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm">Registered Users</h3>
            <span className="text-white/30 text-xs">{allUsers?.length ?? 0} total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-white/40 text-xs uppercase tracking-wider px-5 py-3 font-medium">Name</th>
                  <th className="text-left text-white/40 text-xs uppercase tracking-wider px-5 py-3 font-medium">Email</th>
                  <th className="text-left text-white/40 text-xs uppercase tracking-wider px-5 py-3 font-medium">Role</th>
                  <th className="text-left text-white/40 text-xs uppercase tracking-wider px-5 py-3 font-medium">Joined</th>
                  <th className="text-left text-white/40 text-xs uppercase tracking-wider px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {usersLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8">
                      <Loader2 className="h-5 w-5 text-[#C9A84C] animate-spin mx-auto" />
                    </td>
                  </tr>
                ) : allUsers && allUsers.length > 0 ? (
                  allUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-5 py-3 text-white text-sm">{u.name || "—"}</td>
                      <td className="px-5 py-3 text-white/60 text-sm">{u.email || "—"}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                          u.role === "admin"
                            ? "bg-purple-500/15 text-purple-400"
                            : "bg-white/5 text-white/60"
                        }`}>
                          {u.role === "admin" && <Shield className="h-3 w-3" />}
                          {u.role}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-white/40 text-sm">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-3">
                        <button
                          onClick={() => updateRole.mutate({
                            id: u.id,
                            role: u.role === "admin" ? "user" : "admin",
                          })}
                          className="inline-flex items-center gap-1.5 text-xs text-[#C9A84C] hover:text-[#D4BA6A] transition-colors"
                        >
                          <UserCheck className="h-3.5 w-3.5" />
                          {u.role === "admin" ? "Demote" : "Make Admin"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-white/30 text-sm">
                      No users yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
