# Module for extracting links to all education programs from the HTML code of the following universities.
# Links are extracted using regex pattern-matching, trying to finding the href="" link to each program.
# Run in iex parser by typing:
# c("links.ex")
# Links.readUNI("saved.file")
# Note: replaced 'readUNI' with the relevant abbreviated university function, example: Links.readLNU("lnuTest.html")
defmodule Links do

    # Linneuniversitetet
    def readLNU(inputFile) do
      file = File.read!(inputFile)
      pattern = ~r/href="\/program\/([^"]*)"/

      matches = Regex.scan(pattern, file)

      Enum.each(
        matches, fn(match) ->
          IO.puts("\"https://www.lnu.se/program/"<>Enum.at(match, 1)<>"\",")
      end)
    end
  
    # Umeå Universitet
    def readUMU(inputFile) do
      file = File.read!(inputFile)
      pattern = ~r/href="\/utbildning\/program\/([^"]*)"/

      matches = Regex.scan(pattern, file)

      Enum.each(
        matches, fn(match) ->
          IO.puts("\"https://www.umu.se/utbildning/program/"<>Enum.at(match, 1)<>"\",")
      end)
    end

    # Göteborg Universitet
    def readGU(inputFile) do
      file = File.read!(inputFile)
      pattern = ~r/href="\/studera\/hitta-utbildning\/([^"]*)"/

      matches = Regex.scan(pattern, file)

      Enum.each(
        matches, fn(match) ->
          IO.puts("\"https://www.gu.se/studera/hitta-utbildning/"<>Enum.at(match, 1)<>"\",")
      end)
    end

    # Uppsala Universitet
    def readUU(inputFile) do
      file = File.read!(inputFile)
      pattern = ~r/href="\/utbildning\/program\/([^"]*)"/

      matches = Regex.scan(pattern, file)

      Enum.each(
        matches, fn(match) ->
          IO.puts("\"https://www.uu.se/utbildning/program/"<>Enum.at(match, 1)<>"\",")
      end)
    end
    
    # Luleå Tekniska Universitet
    def readLTU(inputFile) do
      file = File.read!(inputFile)
      pattern = ~r/href="\/utbildning\/program\/([^"]*)"/

      matches = Regex.scan(pattern, file)

      Enum.each(
        matches, fn(match) ->
          IO.puts("\"https://www.ltu.se/utbildning/program/"<>Enum.at(match, 1)<>"\",")
      end)
    end

    # Högskolor below!
    
    # Blekinge Tekniska Högskola
    def readBTH(inputFile) do
      file = File.read!(inputFile)
      pattern = ~r/href="https:\/\/www\.bth\.se\/utbildning\/program-och-kurser\/([^\/]*)\/"/
      matches = Regex.scan(pattern, file)

      Enum.each(
        matches, fn(match) ->
          IO.puts("\"https://www.bth.se/utbildning/program-och-kurser/"<>Enum.at(match, 1)<>"\",")
      end)
    end

    # Högskolan i Borås
    def readHB(inputFile) do
      file = File.read!(inputFile)
      pattern = ~r/href="\/utbildning\/program-och-kurser\/program\/([^"]*)"/
      matches = Regex.scan(pattern, file)

      Enum.each(
        matches, fn(match) -> 
          IO.puts("\"https://www.hb.se/utbildning/program-och-kurser/program/"<>Enum.at(match, 1)<>"\",")
      end)
    end

    # Högskolan i Halmstad
    def readHH(inputFile) do
      file = File.read!(inputFile)
      pattern = ~r/href="\/utbildning\/program\/([^.]*)./

      matches = Regex.scan(pattern, file)

      Enum.each(
        matches, fn(match) ->
          IO.puts("\"https://www.hh.se/utbildning/program/"<>Enum.at(match, 1)<>"\",")
      end)
    end

    # Högskolan i Skövde
    def readHis(inputFile) do
      file = File.read!(inputFile)
      pattern = ~r/data-link="\/utbildning\/([^"]*)"/
        
        matches = Regex.scan(pattern, file)

      Enum.each(
        matches, fn(match) -> 
          IO.puts("\"https://www.his.se/utbildning/"<>Enum.at(match, 1)<>"\",")
      end)
    end
    
    # Högskolan i Kristianstad
    def read(inputFile) do
      file = File.read!(inputFile)
      pattern = ~r/href="\/([^"]*)"/
      matches = Regex.scan(pattern, file)

      Enum.each(
      matches, fn(match) -> 
          IO.puts("\"https://www.hkr.se/"<>Enum.at(match, 1)<>"\",")
      end)
    end

    # Högskolan Väst
    def read(inputFile) do
      file = File.read!(inputFile)
      pattern = ~r/href="\/utbildning\/program\/([^"]*)"/
      matches = Regex.scan(pattern, file)

      Enum.each(
        matches, fn(match) -> 
          IO.puts("\"https://www.hv.se/utbildning/program/"<>Enum.at(match, 1)<>"\",")
      end)
    end
    
    # Södertörns Högskolan
    def read(inputFile) do
      file = File.read!(inputFile)
      pattern = ~r/href="\/program--kurser\/program\/grund\/([^"]*)"/
      matches = Regex.scan(pattern, file)

      Enum.each(
        matches, fn(match) -> 
          IO.puts("\"https://www.sh.se/program--kurser/program/grund/"<>Enum.at(match, 1)<>"\",")
      end)
    end

    # Högskolan i Gävle
    def read(inputFile) do
      file = File.read!(inputFile)
      pattern = ~r/href="\/utbildning\/intresseomraden-och-program\/([^"]*)"/
      matches = Regex.scan(pattern, file)

      Enum.each(
        matches, fn(match) ->
          IO.puts("\"https://www.hig.se/utbildning/intresseomraden-och-program/"<>Enum.at(match, 1)<>"\",")
      end)
    end

    # Högskolan i Dalarna
    def read(inputFile) do
      file = File.read!(inputFile)
      pattern = ~r/href="\/sv\/Utbildning\/Program\/([^"]*)"/
      matches = Regex.scan(pattern, file)

      Enum.each(
        matches, fn(match) ->
          IO.puts("\"https://www.du.se/sv/Utbildning/Program/"<>Enum.at(match, 1)<>"\",")
      end)
    end

    # Stockholms Konstnärliga Högskola
    def read(inputFile) do
      file = File.read!(inputFile)
      pattern = ~r/href="\/utbildningar\/([^"]*)"/
      matches = Regex.scan(pattern, file)

      Enum.each(
        matches, fn(match) -> 
          IO.puts("\"https://www.uniarts.se/utbildningar/"<>Enum.at(match, 1)<>"\",")
      end)
    end

    # Kungliga Musik Högskolan
    def read(inputFile) do
      file = File.read!(inputFile)
      pattern = ~r/href="\/utbildningar\/alla-utbildningar\/([^"]*)"/
      matches = Regex.scan(pattern, file)

      Enum.each(
        matches, fn(match) -> 
          IO.puts("\"https://www.kmh.se/utbildningar/alla-utbildningar/"<>Enum.at(match, 1)<>"\",")
      end)
    end
end

