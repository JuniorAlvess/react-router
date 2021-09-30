import * as React from "react";
import { create as createTestRenderer } from "react-test-renderer";
import { MemoryRouter as Router, Routes, Route, Link } from "react-router-dom";

describe("<Link> anchor href", () => {
  test("absolute <Link to>", () => {
    let renderer = createTestRenderer(
      <Router initialEntries={["/home"]}>
        <Routes>
          <Route path="home" element={<Link to="/about" />} />
        </Routes>
      </Router>
    );

    let anchor = renderer.root.findByType("a");

    expect(anchor.props.href).toEqual("/about");
  });

  test("absolute <Link to> in an index route", () => {
    let renderer = createTestRenderer(
      <Router initialEntries={["/home"]}>
        <Routes>
          <Route path="home">
            <Route index element={<Link to="/about" />} />
          </Route>
        </Routes>
      </Router>
    );

    let anchor = renderer.root.findByType("a");

    expect(anchor.props.href).toEqual("/about");
  });

  test("absolute <Link to> in descendant <Routes>", () => {
    let renderer = createTestRenderer(
      <Router initialEntries={["/auth/login"]}>
        <Routes>
          <Route
            path="auth/*"
            element={
              <Routes>
                <Route
                  path="login"
                  element={<Link to="/auth/forgot-password" />}
                />
              </Routes>
            }
          />
        </Routes>
      </Router>
    );

    let anchor = renderer.root.findByType("a");

    expect(anchor.props.href).toEqual("/auth/forgot-password");
  });

  test('<Link to=".">', () => {
    let renderer = createTestRenderer(
      <Router initialEntries={["/home"]}>
        <Routes>
          <Route path="home" element={<Link to="." />} />
        </Routes>
      </Router>
    );

    let anchor = renderer.root.findByType("a");

    expect(anchor.props.href).toEqual("/home");
  });

  test('<Link to="."> in a splat route', () => {
    let renderer = createTestRenderer(
      <Router initialEntries={["/home/inbox"]}>
        <Routes>
          <Route path="home/*" element={<Link to="." />} />
        </Routes>
      </Router>
    );

    let anchor = renderer.root.findByType("a");

    expect(anchor.props.href).toEqual("/home/inbox");
  });

  test('<Link to="..">', () => {
    let renderer = createTestRenderer(
      <Router initialEntries={["/inbox/messages"]}>
        <Routes>
          <Route path="inbox">
            <Route path="messages/:id" element={<Link to=".." />} />
          </Route>
        </Routes>
      </Router>
    );

    let anchor = renderer.root.findByType("a");

    expect(anchor.props.href).toEqual("/inbox");
  });

  test('<Link to=".."> in an index route', () => {
    let renderer = createTestRenderer(
      <Router initialEntries={["/inbox/messages"]}>
        <Routes>
          <Route path="inbox/messages">
            <Route index element={<Link to=".." />} />
          </Route>
        </Routes>
      </Router>
    );

    let anchor = renderer.root.findByType("a");

    expect(anchor.props.href).toEqual("/");
  });

  test('<Link to=".."> with more .. than parent routes', () => {
    let renderer = createTestRenderer(
      <Router initialEntries={["/inbox/messages/123"]}>
        <Routes>
          <Route path="inbox/messages">
            <Route path=":id" element={<Link to="../.." />} />
          </Route>
        </Routes>
      </Router>
    );

    let anchor = renderer.root.findByType("a");

    expect(anchor.props.href).toEqual("/");
  });

  test('<Link to=".."> with no parent route', () => {
    let renderer = createTestRenderer(
      <Router initialEntries={["/inbox/messages"]}>
        <Routes>
          <Route path="inbox/messages" element={<Link to=".." />} />
        </Routes>
      </Router>
    );

    let anchor = renderer.root.findByType("a");

    expect(anchor.props.href).toEqual("/");
  });

  test("<Link to> pointing to a sibling route", () => {
    let renderer = createTestRenderer(
      <Router initialEntries={["/inbox/messages/123"]}>
        <Routes>
          <Route path="inbox">
            <Route
              path="messages/:id"
              element={<Link to="../messages/456" />}
            />
          </Route>
        </Routes>
      </Router>
    );

    let anchor = renderer.root.findByType("a");

    expect(anchor.props.href).toEqual("/inbox/messages/456");
  });

  describe("under a <Router basename>", () => {
    test("absolute <Link to>", () => {
      let renderer = createTestRenderer(
        <Router basename="/app" initialEntries={["/app/home"]}>
          <Routes>
            <Route path="home" element={<Link to="/about" />} />
          </Routes>
        </Router>
      );

      let anchor = renderer.root.findByType("a");

      expect(anchor.props.href).toEqual("/app/about");
    });

    test('<Link to=".">', () => {
      let renderer = createTestRenderer(
        <Router basename="/app" initialEntries={["/app/home"]}>
          <Routes>
            <Route path="home" element={<Link to="." />} />
          </Routes>
        </Router>
      );

      let anchor = renderer.root.findByType("a");

      expect(anchor.props.href).toEqual("/app/home");
    });

    test('<Link to=".."> with no parent route', () => {
      let renderer = createTestRenderer(
        <Router basename="/app" initialEntries={["/app/home"]}>
          <Routes>
            <Route path="home" element={<Link to=".." />} />
          </Routes>
        </Router>
      );

      let anchor = renderer.root.findByType("a");

      expect(anchor.props.href).toEqual("/app");
    });
  });
});
