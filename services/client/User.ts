const all = async () => {
  const res = await fetch("/api/users");

  const { users, error } = await res.json();

  if (error) {
    throw new Error(error.message);
  }

  return users?.users || [];
};

const deleteId = async (id: string) => {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });

  const { data, error } = await res.json();

  if (error) {
    throw new Error(error.message);
  }

  return null;
};

const current = async () => {
  const res = await fetch("/api/session/");

  const { session, error } = await res.json();

  if (error) {
    throw new Error(error.message);
  }

  return session;
};

const create = async (email: string, role: string) => {
  const res = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({ email, role }),
  });

  const { session, error } = await res.json();

  if (error) {
    throw new Error(error.message);
  }

  return session;
};

export default { all, deleteId, current, create };
