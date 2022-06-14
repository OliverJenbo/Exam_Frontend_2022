function UserPage({ facade, logout }) {
  return (
    <div className="row">
      <div className="offset-4 col-4 border mt-2">
        <p>Hello {facade.getUsername()}!</p>
        <p>
          Your role is {facade.getUserRoles()}. You have access to a varaiaty of
          different tabs! Enjoy.
        </p>
        <button type="submit" class="btn btn-success mt-2" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserPage;
