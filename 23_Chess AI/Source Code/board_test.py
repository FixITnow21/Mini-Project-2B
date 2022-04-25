import imp
import chess
from chess_engine import Engine

newEngine = Engine("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")

print(newEngine.piece_values)
