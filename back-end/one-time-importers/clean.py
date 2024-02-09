import csv
import re


def replace_special_characters(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as infile, open(output_file, 'w', encoding='utf-8',
                                                                 newline='') as outfile:
        reader = csv.reader(infile)
        writer = csv.writer(outfile)

        for row in reader:
            # Replace special characters in each cell
            modified_row = [re.sub('[^a-zA-Z0-9\s]', ' ', cell) for cell in row]

            # Write the modified row to the output file
            writer.writerow(modified_row)


# Example usage
replace_special_characters('input.csv', 'output.csv')
