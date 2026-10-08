"""Serve the study workspace on a fixed, local-only address. No dependencies."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse
import threading
from urllib.request import urlopen
import webbrowser


class StudyHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()


def main():
    parser = argparse.ArgumentParser(description="Local study workspace")
    parser.add_argument("--open", action="store_true", help="Open the browser")
    args = parser.parse_args()
    root = Path(__file__).resolve().parent
    address = "http://127.0.0.1:8765"
    try:
        server = ThreadingHTTPServer(("127.0.0.1", 8765), partial(StudyHandler, directory=str(root)))
    except OSError:
        try:
            with urlopen(address + "/index.html", timeout=2) as response:
                existing = response.read().decode("utf-8")
            if "<title>拾阶 · AI 工程师学习工作台</title>" in existing:
                print(f"Study workspace is already running: {address}", flush=True)
                if args.open:
                    webbrowser.open(address)
                return
        except (OSError, UnicodeError):
            pass
        print("Port 8765 is unavailable. Close the existing server, or open index.html directly.")
        raise SystemExit(1)
    print(f"Study workspace: {address}", flush=True)
    print("Keep this window open. Press Ctrl+C to stop.", flush=True)
    if args.open:
        threading.Timer(0.5, lambda: webbrowser.open(address)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
