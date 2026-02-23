from pathlib import Path
from typing import Iterable, Iterator

ALPHABET = "01"
LENGTH = 29
OUTPUT_PATH = Path("Dictionary.txt")


def necklaces() -> Iterable[str]:
    state = [0] * (LENGTH + 1)
    render = [ALPHABET[0]] * LENGTH
    yield from _generate(state, render, 1, 1)


def _generate(
    state: list[int], render: list[str], depth: int, period: int
) -> Iterator[str]:
    if depth > LENGTH:
        if LENGTH % period == 0:
            yield "".join(render)
        return

    prev_value = state[depth - period]
    state[depth] = prev_value
    render[depth - 1] = ALPHABET[prev_value]
    yield from _generate(state, render, depth + 1, period)
    for bit in range(prev_value + 1, len(ALPHABET)):
        state[depth] = bit
        render[depth - 1] = ALPHABET[bit]
        yield from _generate(state, render, depth + 1, depth)


def main() -> None:
    print(f"Generating necklaces of length {LENGTH}...")
    with OUTPUT_PATH.open("w", encoding="utf-8") as output_file:
        for necklace in necklaces():
            output_file.write(f"{necklace}\n")


if __name__ == "__main__":
    main()
