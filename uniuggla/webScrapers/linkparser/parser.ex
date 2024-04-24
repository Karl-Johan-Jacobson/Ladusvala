defmodule Parser do

  def read(inputFile) do
    file = File.read!(inputFile)
    pattern = ~r/href="\/([^"]*)"/
    matches = Regex.scan(pattern, file)

    Enum.each(
      matches, fn(match) -> 
        IO.puts("\"https://www.hkr.se/"<>Enum.at(match, 1)<>"\",")
    end)
  end

end
